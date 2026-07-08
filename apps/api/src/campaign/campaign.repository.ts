import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class CampaignRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: {
    name: string;
    gameId: string;
  }) {
    return this.prisma.campaign.create({
      data,
    });
  }

  async findAll() {
    return this.prisma.campaign.findMany({
      include: {
        game: true,
      },
    });
  }

  async findById(id: string) {
    return this.prisma.campaign.findUnique({
      where: { id },
      include: {
        game: true,
        factions: true,
        turns: true,
      },
    });
  }

  async update(
    id: string,
    data: {
      name?: string;
      gameId?: string;
    },
  ) {
    return this.prisma.campaign.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return this.prisma.campaign.delete({
      where: { id },
    });
  }
}