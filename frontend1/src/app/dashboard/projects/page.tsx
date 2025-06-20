
import { ProjectCard } from "@/app/components/projects/ProjectCard";
import { Button } from "@/app/components/ui/button";
import { useDeleteProject, useProjects } from "@/hooks/useProjects";
import Link from "next/link";

export default function ProjectsList() {
  const { data: projects, isLoading, error } = useProjects();
  const deleteProject = useDeleteProject();

  if (isLoading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error.message}</div>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Mes Projets</h1>
        <Link href="/dashboard/projects/create">
          <Button>Nouveau Projet</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects?.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}