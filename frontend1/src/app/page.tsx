"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useProjects, useCreateProject } from "@/hooks/useProjects";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Skeleton } from "@/app/components/ui/skeleton";
import { FolderKanban, Plus, CheckCircle, Clock } from "lucide-react";
import { ProjectCard } from "./components/projects/ProjectCard";
import { ProjectForm } from "./components/projects/ProjectForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/app/components/ui/dialog";
import { Project } from "./types/project";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const { data: projects = [], isLoading, error } = useProjects();
  const createProject = useCreateProject();
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/register");
    } else if (status === "authenticated" && !session?.user) {
      router.push("/login");
    }
  }, [status, session, router]);

  const { totalTasks, completedTasks, inProgressTasks } = useMemo(() => {
    return projects.reduce((acc, project) => {
      acc.totalTasks += project.tasks.length;
      acc.completedTasks += project.tasks.filter(task => task.status === "completed").length;
      acc.inProgressTasks += project.tasks.filter(task => task.status === "in-progress").length;
      return acc;
    }, { totalTasks: 0, completedTasks: 0, inProgressTasks: 0 });
  }, [projects]);

  if (status === "loading" || isLoading) {
    return (
      <div className="p-8 space-y-8">
        <div className="space-y-4">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-96" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-32 rounded-lg" />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-48 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (status === "unauthenticated" || !session?.user) {
    return null; 
  }

  if (error) {
    return (
      <div className="p-8 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-destructive">Erreur</CardTitle>
            <CardDescription>
              Impossible de charger les projets. Veuillez réessayer.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" onClick={() => window.location.reload()}>
              Recharger
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleCreateProject = (projectData: Omit<Project, "id" | "createdAt" | "tasks">) => {
    createProject.mutate(projectData, {
      onSuccess: () => {
        setIsCreateDialogOpen(false);
      }
    });
  };

  return (
    <div className="p-4 md:p-8 space-y-8 bg-gradient-to-br from-slate-50 to-white min-h-screen">
     
      <div className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800">Dashboard</h1>
        <p className="text-slate-600">
          Vue d'ensemble de vos projets et tâches
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <StatCard
          title="Projets Actifs"
          value={projects.length}
          description="projets en cours"
          icon={<FolderKanban className="h-5 w-5 text-blue-600" />}
          color="blue"
        />
        
        <StatCard
          title="Tâches Terminées"
          value={completedTasks}
          description={`sur ${totalTasks} tâches`}
          icon={<CheckCircle className="h-5 w-5 text-green-600" />}
          color="green"
        />
        
        <StatCard
          title="En Cours"
          value={inProgressTasks}
          description="tâches actives"
          icon={<Clock className="h-5 w-5 text-orange-600" />}
          color="orange"
        />
      </div>

      <div className="space-y-4 md:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-800">Vos Projets</h2>
            <p className="text-slate-600 mt-1">
              Gérez vos projets et leurs tâches
            </p>
          </div>
          <Button
            onClick={() => setIsCreateDialogOpen(true)}
            className="gap-2 shadow-sm"
            size="sm"
          >
            <Plus className="h-4 w-4" />
            Nouveau Projet
          </Button>
        </div>

        {projects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <EmptyState onAddProject={() => setIsCreateDialogOpen(true)} />
        )}
      </div>

      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Créer un nouveau projet</DialogTitle>
          </DialogHeader>
          <ProjectForm 
            onSubmit={handleCreateProject}
            isLoading={createProject.isPending}
            onCancel={() => setIsCreateDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

const StatCard = ({ title, value, description, icon, color }: {
  title: string;
  value: number;
  description: string;
  icon: React.ReactNode;
  color: "blue" | "green" | "orange";
}) => {
  const colors = {
    blue: { bg: "from-blue-50 to-blue-100/50", text: "text-blue-800", value: "text-blue-900", desc: "text-blue-700" },
    green: { bg: "from-green-50 to-green-100/50", text: "text-green-800", value: "text-green-900", desc: "text-green-700" },
    orange: { bg: "from-orange-50 to-orange-100/50", text: "text-orange-800", value: "text-orange-900", desc: "text-orange-700" },
  };

  return (
    <Card className={`border-0 shadow-sm bg-gradient-to-br ${colors[color].bg}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className={`text-lg font-semibold ${colors[color].text}`}>
            {title}
          </CardTitle>
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className={`text-3xl font-bold ${colors[color].value}`}>
          {value}
        </div>
        <p className={`text-sm ${colors[color].desc} mt-1`}>
          {description}
        </p>
      </CardContent>
    </Card>
  );
};

const EmptyState = ({ onAddProject }: { onAddProject: () => void }) => (
  <Card className="border-2 border-dashed border-slate-200 bg-slate-50/50">
    <CardContent className="flex flex-col items-center justify-center py-12 px-6">
      <div className="p-3 bg-slate-100 rounded-full mb-4">
        <FolderKanban className="h-6 w-6 text-slate-500" />
      </div>
      <h3 className="text-lg font-semibold text-slate-700 mb-2 text-center">
        Aucun projet pour le moment
      </h3>
      <p className="text-slate-500 text-center mb-6 max-w-md text-sm">
        Créez votre premier projet pour commencer à organiser vos tâches
        et suivre votre progression.
      </p>
      <Button
        onClick={onAddProject}
        className="gap-2"
        size="sm"
      >
        <Plus className="h-4 w-4" />
        Créer mon premier projet
      </Button>
    </CardContent>
  </Card>
);

export default Dashboard;