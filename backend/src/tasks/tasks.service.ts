import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskStatus } from './dto/task-status.enum';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(createTaskDto: CreateTaskDto) {
    return this.prisma.task.create({
      data: {
        title: createTaskDto.title,
        description: createTaskDto.description,
        status: createTaskDto.status || TaskStatus.TODO,
        dueDate: createTaskDto.dueDate,
        project: {
          connect: { id: createTaskDto.projectId },
        },
      },
    });
  }

  async findAll(projectId?: number, status?: TaskStatus) {
    return this.prisma.task.findMany({
      where: {
        projectId: projectId ? Number(projectId) : undefined,
        status: status ? status : undefined,
      },
      include: {
        project: {
          select: {
            title: true,
          },
        },
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.task.findUnique({
      where: { id },
      include: {
        project: {
          select: {
            title: true,
          },
        },
      },
    });
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    return this.prisma.task.update({
      where: { id },
      data: updateTaskDto,
    });
  }

  async remove(id: number) {
    return this.prisma.task.delete({
      where: { id },
    });
  }
}