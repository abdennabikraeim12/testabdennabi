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
  username: z.string().min(3, 'Le nom d\'utilisateur doit contenir au moins 3 caractères'),
  password: z.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
})

export function RegisterForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      username: '',
      password: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    
    try {
      const response = await api.post('/auth/register', values, {
        headers: {
          'Content-Type': 'application/json',
        },
      })

      toast({
        title: 'Inscription réussie',
        description: 'Votre compte a été créé avec succès',
      })

      if (response.data.access_token) {
        localStorage.setItem('token', response.data.access_token)
        api.setAuthToken(response.data.access_token)
        router.push('/dashboard')
      } else {
        router.push('/login')
      }

    } catch (error) {
      console.error('Registration failed:', error)
      
      let errorMessage = 'Une erreur est survenue'
      
      if (error.response) {
        errorMessage = error.response.data?.message || 
                      error.response.data?.error ||
                      (error.response.status === 500 ? 'Erreur interne du serveur' : errorMessage)
        
        console.log('Full error response:', error.response.data)
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
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom d'utilisateur</FormLabel>
              <FormControl>
                <Input 
                  placeholder="john_doe" 
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
          {isLoading ? 'Traitement...' : 'S\'inscrire'}
        </Button>
      </form>
    </Form>
  )
}