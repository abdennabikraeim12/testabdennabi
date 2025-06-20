import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Request } from 'express';
export declare class ProjectsController {
    private readonly projectsService;
    constructor(projectsService: ProjectsService);
    create(req: Request, createProjectDto: CreateProjectDto): Promise<{
        id: number;
        title: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
    }>;
    findAll(req: Request): Promise<{
        id: number;
        title: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
    }[]>;
    findOne(req: Request, id: string): Promise<{
        id: number;
        title: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
    }>;
    update(req: Request, id: string, updateProjectDto: UpdateProjectDto): Promise<{
        id: number;
        title: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
    }>;
    remove(req: Request, id: string): Promise<{
        id: number;
        title: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
    }>;
}
