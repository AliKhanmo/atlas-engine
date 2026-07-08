import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FactionResourceRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: {
    factionId: string;
    resourceTypeId: string;
    amount: number;
  }) {
    return this.prisma.factionResource.create({
      data,
    });
  }

  async findAll() {
    return this.prisma.factionResource.findMany({
      include: {
        faction: true,
        resourceType: true,
      },
    });
  }

  async findById(id: string) {
    return this.prisma.factionResource.findUnique({
      where: { id },
      include: {
        faction: true,
        resourceType: true,
      },
    });
  }

  async update(
    id: string,
    data: {
      factionId?: string;
      resourceTypeId?: string;
      amount?: number;
    },
  ) {
    return this.prisma.factionResource.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return this.prisma.factionResource.delete({
      where: { id },
    });
  }
}
