import api from '../lib/api';
import { Task } from '../types/task';

export const tasksApi = {
  getTasks: async (): Promise<Task[]> => {
    const response = await api.get('/tasks');
    return response.data;
  },

  getTask: async (id: string): Promise<Task> => {
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  },

  createTask: async (taskData: Omit<Task, 'id' | 'createdAt'>): Promise<Task> => {
    const response = await api.post('/tasks', taskData);
    return response.data;
  },

  updateTask: async (id: string, updates: Partial<Task>): Promise<Task> => {
    const response = await api.patch(`/tasks/${id}`, updates);
    return response.data;
  },

  deleteTask: async (id: string): Promise<void> => {
    await api.delete(`/tasks/${id}`);
  },

  getProjectTasks: async (projectId: string): Promise<Task[]> => {
    const response = await api.get(`/tasks?projectId=${projectId}`);
    return response.data;
  },
};