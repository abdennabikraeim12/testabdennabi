import { ProjectForm } from "@/app/components/projects/ProjectForm"
import api from "@/app/lib/api"

async function getProject(id: string) {
  try {
    const response = await api.get(`/projects/${id}`)
    return response.data
  } catch (error) {
    console.error('Failed to fetch project:', error)
    throw new Error('Failed to fetch project')
  }
}

export default async function ProjectDetailPage({
  params
}: {
  params: { id: string }
}) {
  const project = await getProject(params.id)

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Éditer le projet</h1>
      <ProjectForm project={project} />
    </div>
  )
}
