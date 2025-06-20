'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useState } from 'react'
import { toast } from '@/hooks/use-toast'

import { Input } from '../ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Button } from '../ui/button'
import api from '@/app/lib/api'

const formSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
})

export function LoginForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    
    try {
      const response = await api.post('/auth/login', values)

      const { access_token } = response.data
      
      localStorage.setItem('token', access_token)
      setAuthToken(access_token)

      toast({
        title: 'Connexion réussie',
        description: 'Vous êtes maintenant connecté',
      })

      router.push('/dashboard')

    } catch (error) {
      console.error('Login failed:', error)
      
      let errorMessage = 'Échec de la connexion'
      
      if (error.response) {
        errorMessage = error.response.data?.message || 
                      (error.response.status === 401 
                        ? 'Email ou mot de passe incorrect' 
                        : errorMessage)
      } else if (error.request) {
        errorMessage = 'Le serveur ne répond pas'
      }

      toast({
        title: 'Erreur',
        description: errorMessage,
        variant: 'destructive',
      })

    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input 
                  placeholder="email@exemple.com" 
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mot de passe</FormLabel>
              <FormControl>
                <Input 
                  type="password" 
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button 
          type="submit" 
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? 'Connexion en cours...' : 'Se connecter'}
        </Button>
      </form>
    </Form>
  )
}