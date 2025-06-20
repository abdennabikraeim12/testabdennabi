import { ProjectForm } from "@/app/components/projects/ProjectForm"

async function getProject(id: string) {
  const res = await fetch(`http://localhost:3000/api/projects/${id}`)
  if (!res.ok) throw new Error('Failed to fetch project')
  return res.json()
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