import { Injectable, NotFoundException } from '@nestjs/common';
import { FactionMemberRepository } from './factionMember.repository';
import { CreateFactionMemberDto } from './dto/create-factionMember.dto';
import { UpdateFactionMemberDto } from './dto/update-factionMember.dto';

@Injectable()
export class FactionMemberService {
  constructor(private readonly repository: FactionMemberRepository) {}

  create(dto: CreateFactionMemberDto) {
    return this.repository.create(dto);
  }

  findAll() {
    return this.repository.findAll();
  }

  async findById(id: string) {
    const member = await this.repository.findById(id);

    if (!member) {
      throw new NotFoundException(`FactionMember ${id} not found`);
    }

    return member;
  }

  async update(id: string, dto: UpdateFactionMemberDto) {
    await this.findById(id);

    return this.repository.update(id, dto);
  }

  async delete(id: string) {
    await this.findById(id);

    return this.repository.delete(id);
  }
}
