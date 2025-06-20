import { Task } from "./task";

export interface Project {
  id: string;
  title: string;
  description: string;
  userId: string;
  createdAt: string;
  tasks: Task[];
}