import { TaskStatus } from './task-status.enum';
export declare class CreateTaskDto {
    title: string;
    description?: string;
    status?: TaskStatus;
    dueDate?: Date;
    projectId: number;
}
