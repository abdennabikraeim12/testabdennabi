import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "@/hooks/use-toast";
import { Project } from "@/app/types/project";
import { projectsApi } from "@/app/api/projects";
import { Task } from "@/app/types/task";

export const useProjects = () => {
  return useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: projectsApi.getProjects,
  });
};

export const useProject = (id: string) => {
  return useQuery<Project>({
    queryKey: ["project", id],
    queryFn: () => projectsApi.getProject(id),
  });
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation<Project, Error, Omit<Project, "id" | "createdAt" | "tasks">>({
    mutationFn: projectsApi.createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast({
        title: "Projet créé",
        description: "Le projet a été créé avec succès.",
      });
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description: error.message || "Impossible de créer le projet.",
        variant: "destructive",
      });
    },
  });
};

export const useUpdateProject = () => {
  const queryClient = useQueryClient();

  return useMutation<Project, Error, { id: string; updates: Partial<Project> }>({
    mutationFn: ({ id, updates }) => projectsApi.updateProject(id, updates),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["project", variables.id] });
      toast({
        title: "Projet modifié",
        description: "Le projet a été modifié avec succès.",
      });
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description: error.message || "Impossible de modifier le projet.",
        variant: "destructive",
      });
    },
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: projectsApi.deleteProject,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.removeQueries({ queryKey: ["project", id] });
      toast({
        title: "Projet supprimé",
        description: "Le projet a été supprimé avec succès.",
      });
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description: error.message || "Impossible de supprimer le projet.",
        variant: "destructive",
      });
    },
  });
};

export const useProjectTasks = (projectId: string) => {
  return useQuery<Task[]>({
    queryKey: ["project-tasks", projectId],
    queryFn: () => projectsApi.getProjectTasks(projectId),
    enabled: !!projectId,
  });
};
