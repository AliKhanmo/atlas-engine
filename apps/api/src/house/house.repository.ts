import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class HouseRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: {
    name: string;
    description?: string;
    factionId: string;
    telegramChatId?: string;
  }) {
    return this.prisma.house.create({
      data,
    });
  }

  async findById(id: string) {
    return this.prisma.house.findUnique({
      where: { id },
      include: {
        faction: true,
        members: {
          include: {
            player: true,
          },
        },
        resources: {
          include: {
            resourceType: true,
          },
        },
        actions: true,
      },
    });
  }

  async findByTelegramChatId(telegramChatId: string) {
    return this.prisma.house.findUnique({
      where: {
        telegramChatId,
      },
      include: {
        faction: true,
        members: {
          include: {
            player: true,
          },
        },
        resources: {
          include: {
            resourceType: true,
          },
        },
      },
    });
  }

  async findAllByFaction(factionId: string) {
    return this.prisma.house.findMany({
      where: {
        factionId,
      },
      include: {
        members: true,
        resources: true,
      },
    });
  }

  async update(
    id: string,
    data: {
      name?: string;
      description?: string;
      factionId?: string;
      telegramChatId?: string;
    },
  ) {
    return this.prisma.house.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return this.prisma.house.delete({
      where: { id },
    });
  }
}
