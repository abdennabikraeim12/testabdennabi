import { ProjectForm } from "@/app/components/projects/ProjectForm";

export default function CreateProjectPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Créer un nouveau projet</h1>
      <ProjectForm />
    </div>
  )
}