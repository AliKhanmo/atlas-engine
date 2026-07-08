import { Injectable } from '@nestjs/common';
import { TurnStatus } from '@prisma/client';
import { Prisma, Turn } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TurnRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: { number: number; campaignId: string }) {
    return this.prisma.turn.create({
      data,
    });
  }

  async findAll() {
    return this.prisma.turn.findMany({
      include: {
        campaign: true,
      },
    });
  }

  async findById(id: string) {
    return this.prisma.turn.findUnique({
      where: { id },
      include: {
        campaign: true,
        events: true,
        actions: true,
      },
    });
  }

  async update(id: string, data: Prisma.TurnUpdateInput): Promise<Turn> {
    return this.prisma.turn.update({
      where: { id },
      data,
    });
  }
  async delete(id: string) {
    return this.prisma.turn.delete({
      where: { id },
    });
  }
}
