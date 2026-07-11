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
        faction: {
          include: {
            campaign: true,
          },
        },

        castle: true,

        // All characters, not just the lord - needed for commanders too
        characters: true,

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

        productions: {
          include: {
            resourceType: true,
          },
        },

        units: {
          include: {
            unitType: true,
          },
        },

        // Diplomacy: this house's relations in both directions
        relationsFrom: {
          include: {
            houseB: true,
          },
        },

        relationsTo: {
          include: {
            houseA: true,
          },
        },

        actions: true,
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
