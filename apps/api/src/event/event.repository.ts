import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EventRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: {
    title: string;
    description?: string;
    effect?: object;
    turnId: string;
  }) {
    return this.prisma.event.create({
      data,
    });
  }

  async findAll() {
    return this.prisma.event.findMany({
      include: {
        turn: true,
      },
    });
  }

  async findById(id: string) {
    return this.prisma.event.findUnique({
      where: { id },
      include: {
        turn: true,
      },
    });
  }

  async update(
    id: string,
    data: {
      title?: string;
      description?: string;
      effect?: object;
      turnId?: string;
    },
  ) {
    return this.prisma.event.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return this.prisma.event.delete({
      where: { id },
    });
  }
}
