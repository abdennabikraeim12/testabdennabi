"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ProjectsService = class ProjectsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, createProjectDto) {
        return this.prisma.project.create({
            data: Object.assign(Object.assign({}, createProjectDto), { user: {
                    connect: { id: userId }
                } }),
        });
    }
    async findAll(userId) {
        return this.prisma.project.findMany({
            where: { userId }
        });
    }
    async findOne(userId, id) {
        return this.prisma.project.findFirst({
            where: { id, userId }
        });
    }
    async update(userId, id, updateProjectDto) {
        return this.prisma.project.update({
            where: { id, userId },
            data: updateProjectDto
        });
    }
    async remove(userId, id) {
        return this.prisma.project.delete({
            where: { id, userId }
        });
    }
};
exports.ProjectsService = ProjectsService;
exports.ProjectsService = ProjectsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProjectsService);
//# sourceMappingURL=projects.service.js.map