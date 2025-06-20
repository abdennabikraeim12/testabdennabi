import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskStatus } from './dto/task-status.enum';
export declare class TasksService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createTaskDto: CreateTaskDto): Promise<{
        id: number;
        title: string;
        description: string | null;
        status: import(".prisma/client").$Enums.TaskStatus;
        dueDate: Date | null;
        createdAt: Date;
        updatedAt: Date;
        projectId: number;
    }>;
    findAll(projectId?: number, status?: TaskStatus): Promise<({
        project: {
            title: string;
        };
    } & {
        id: number;
        title: string;
        description: string | null;
        status: import(".prisma/client").$Enums.TaskStatus;
        dueDate: Date | null;
        createdAt: Date;
        updatedAt: Date;
        projectId: number;
    })[]>;
    findOne(id: number): Promise<{
        project: {
            title: string;
        };
    } & {
        id: number;
        title: string;
        description: string | null;
        status: import(".prisma/client").$Enums.TaskStatus;
        dueDate: Date | null;
        createdAt: Date;
        updatedAt: Date;
        projectId: number;
    }>;
    update(id: number, updateTaskDto: UpdateTaskDto): Promise<{
        id: number;
        title: string;
        description: string | null;
        status: import(".prisma/client").$Enums.TaskStatus;
        dueDate: Date | null;
        createdAt: Date;
        updatedAt: Date;
        projectId: number;
    }>;
    remove(id: number): Promise<{
        id: number;
        title: string;
        description: string | null;
        status: import(".prisma/client").$Enums.TaskStatus;
        dueDate: Date | null;
        createdAt: Date;
        updatedAt: Date;
        projectId: number;
    }>;
}
