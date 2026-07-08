import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class GameRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: { name: string; description?: string }) {
    return this.prisma.game.create({ data });
  }

  async findAll() {
    return this.prisma.game.findMany();
  }

  async findById(id: string) {
    return this.prisma.game.findUnique({ where: { id } });
  }

  async update(
    id: string,
    data: { name?: string; description?: string },
  ) {
    return this.prisma.game.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return this.prisma.game.delete({
      where: { id },
    });
  }
}