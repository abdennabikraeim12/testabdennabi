import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
export declare class ProjectsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: number, createProjectDto: CreateProjectDto): Promise<{
        id: number;
        title: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
    }>;
    findAll(userId: number): Promise<{
        id: number;
        title: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
    }[]>;
    findOne(userId: number, id: number): Promise<{
        id: number;
        title: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
    }>;
    update(userId: number, id: number, updateProjectDto: UpdateProjectDto): Promise<{
        id: number;
        title: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
    }>;
    remove(userId: number, id: number): Promise<{
        id: number;
        title: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
    }>;
}
