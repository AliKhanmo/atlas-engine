import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FactionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: {
    name: string;
    description?: string;
    campaignId: string;
  }) {
    return this.prisma.faction.create({
      data,
    });
  }

  async findAll() {
    return this.prisma.faction.findMany({
      include: {
        campaign: true,
      },
    });
  }

  async findById(id: string) {
    return this.prisma.faction.findUnique({
      where: { id },
      include: {
        campaign: true,
        members: true,
        resources: true,
        actions: true,
      },
    });
  }

  async update(
    id: string,
    data: {
      name?: string;
      description?: string;
      campaignId?: string;
    },
  ) {
    return this.prisma.faction.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return this.prisma.faction.delete({
      where: { id },
    });
  }
}
