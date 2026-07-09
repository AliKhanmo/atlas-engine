import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FactionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: {
    name: string;
    description?: string;
    bonuses?: object;
    telegramChatId?: string;
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
        houses: true,
      },
    });
  }

  async update(
    id: string,
    data: {
      name?: string;
      description?: string;
      bonuses?: object;
      telegramChatId?: string;
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
