import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, createProjectDto: CreateProjectDto) {
    return this.prisma.project.create({
      data: {
        ...createProjectDto,
        user: {
          connect: { id: userId }
        }
      },
    });
  }

  async findAll(userId: number) {
    return this.prisma.project.findMany({
      where: { userId }
    });
  }

  async findOne(userId: number, id: number) {
    return this.prisma.project.findFirst({
      where: { id, userId }
    });
  }

  async update(userId: number, id: number, updateProjectDto: UpdateProjectDto) {
    return this.prisma.project.update({
      where: { id, userId },
      data: updateProjectDto
    });
  }

  async remove(userId: number, id: number) {
    return this.prisma.project.delete({
      where: { id, userId }
    });
  }
}