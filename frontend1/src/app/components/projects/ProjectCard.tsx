import Link from 'next/link';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Project } from '@/app/types/project';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{project.title}</CardTitle>
        <CardDescription>
          {project.description || 'Aucune description'}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col space-y-2">
        <Link href={`/dashboard/projects/${project.id}`}>
          <Button variant="outline" className="w-full">
            Voir les détails
          </Button>
        </Link>
        <div className="text-xs text-muted-foreground">
          {project.tasks?.length || 0} tâches
        </div>
      </CardContent>
    </Card>
  );
}