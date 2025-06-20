import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { Task } from "@/app/types/task";
import { tasksApi } from "@/app/api/tasksApi";

export const useTasks = () => {
  return useQuery<Task[]>({
    queryKey: ["tasks"],
    queryFn: tasksApi.getTasks,
  });
};

export const useTask = (id: string) => {
  return useQuery<Task>({
    queryKey: ["task", id],
    queryFn: () => tasksApi.getTask(id),
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation<Task, Error, Omit<Task, "id" | "createdAt">>({
    mutationFn: tasksApi.createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast({
        title: "Task created",
        description: "Task was created successfully",
      });
    },
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation<Task, Error, { id: string; updates: Partial<Task> }>({
    mutationFn: ({ id, updates }) => tasksApi.updateTask(id, updates),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["task", variables.id] });
      toast({
        title: "Task updated",
        description: "Task was updated successfully",
      });
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: tasksApi.deleteTask,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.removeQueries({ queryKey: ["task", id] });
      toast({
        title: "Task deleted",
        description: "Task was deleted successfully",
      });
    },
  });
};