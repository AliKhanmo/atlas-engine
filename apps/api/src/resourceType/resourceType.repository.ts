import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ResourceTypeRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(data: Prisma.ResourceTypeCreateInput) {
    return this.prisma.resourceType.create({
      data,
    });
  }

  async findAll() {
    return this.prisma.resourceType.findMany();
  }

  async findById(id: string) {
    return this.prisma.resourceType.findUnique({
      where: { id },
    });
  }

  async update(
    id: string,
    data: Prisma.ResourceTypeUpdateInput,
  ) {
    return this.prisma.resourceType.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return this.prisma.resourceType.delete({
      where: { id },
    });
  }
}