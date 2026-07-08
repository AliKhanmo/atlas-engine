import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FactionMemberRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: {
    playerId: string;
    factionId: string;
    role?: 'LEADER' | 'MEMBER';
  }) {
    return this.prisma.factionMember.create({
      data,
    });
  }

  async findAll() {
    return this.prisma.factionMember.findMany({
      include: {
        player: true,
        faction: true,
      },
    });
  }

  async findById(id: string) {
    return this.prisma.factionMember.findUnique({
      where: { id },
      include: {
        player: true,
        faction: true,
      },
    });
  }

  async update(
    id: string,
    data: {
      playerId?: string;
      factionId?: string;
      role?: 'LEADER' | 'MEMBER';
    },
  ) {
    return this.prisma.factionMember.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return this.prisma.factionMember.delete({
      where: { id },
    });
  }
}
