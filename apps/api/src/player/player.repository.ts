import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';

@Injectable()
export class PlayerRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreatePlayerDto) {
    return this.prisma.player.create({
      data,
    });
  }

  async findAll() {
    return this.prisma.player.findMany({
      include: {
        factions: true,
      },
    });
  }

  async findById(id: string) {
    return this.prisma.player.findUnique({
      where: { id },
      include: {
        factions: true,
      },
    });
  }

  async findByTelegramId(telegramId: string) {
    return this.prisma.player.findUnique({
      where: { telegramId },
      include: {
        factions: true,
      },
    });
  }

  async update(id: string, data: UpdatePlayerDto) {
    return this.prisma.player.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return this.prisma.player.delete({
      where: { id },
    });
  }
}
