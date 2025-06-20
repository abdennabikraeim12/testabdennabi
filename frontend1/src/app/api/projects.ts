import api from "../lib/api";
import { Project } from "../types/project";
import { Task } from "../types/task";

export const projectsApi = {
  getProjects: async (): Promise<Project[]> => {
    const response = await api.get("/projects");
    return response.data;
  },

  getProject: async (id: string): Promise<Project> => {
    const response = await api.get(`/projects/${id}`);
    return response.data;
  },

  createProject: async (project: Omit<Project, "id" | "createdAt" | "tasks">): Promise<Project> => {
    const response = await api.post("/projects", project);
    return response.data;
  },

  updateProject: async (id: string, updates: Partial<Project>): Promise<Project> => {
    const response = await api.put(`/projects/${id}`, updates);
    return response.data;
  },

  deleteProject: async (id: string): Promise<void> => {
    await api.delete(`/projects/${id}`);
  },

  getProjectTasks: async (projectId: string): Promise<Task[]> => {
    const response = await api.get(`/projects/${projectId}/tasks`);
    return response.data;
  },
};