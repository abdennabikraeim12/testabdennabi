'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'

import { Project } from '@/app/types/project'
import { useCreateProject, useUpdateProject } from '@/hooks/useProjects'

const formSchema = z.object({
  title: z.string().min(1, 'Le titre est requis'),
  description: z.string().optional(),
})

interface ProjectFormProps {
  project?: Project
}

export function ProjectForm({ project }: ProjectFormProps) {
  const router = useRouter()
  const createProject = useCreateProject()
  const updateProject = useUpdateProject()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: project?.title || '',
      description: project?.description || '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (project) {
        await updateProject.mutateAsync({
          id: project.id,
          updates: values
        })
      } else {
        await createProject.mutateAsync(values)
      }
      
      router.push('/dashboard/projects')
      router.refresh()
    } catch (error) {
      console.error('Operation failed:', error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Titre</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Nom du projet" 
                  {...field} 
                  disabled={createProject.isPending || updateProject.isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Description du projet"
                  className="min-h-[100px]"
                  {...field}
                  disabled={createProject.isPending || updateProject.isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/dashboard/projects')}
            disabled={createProject.isPending || updateProject.isPending}
          >
            Annuler
          </Button>
          <Button 
            type="submit"
            disabled={createProject.isPending || updateProject.isPending}
          >
            {project ? 'Mettre à jour' : 'Créer'}
            {(createProject.isPending || updateProject.isPending) && (
              <span className="ml-2">...</span>
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}