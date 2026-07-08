import { Injectable, NotFoundException } from '@nestjs/common';
import { FactionRepository } from './faction.repository';
import { CreateFactionDto } from './dto/create-faction.dto';

@Injectable()
export class FactionService {
  constructor(private readonly factionRepository: FactionRepository) {}

  async create(data: CreateFactionDto) {
    return this.factionRepository.create(data);
  }

  async findAll() {
    return this.factionRepository.findAll();
  }

  async findById(id: string) {
    const faction = await this.factionRepository.findById(id);

    if (!faction) {
      throw new NotFoundException(`Faction ${id} not found`);
    }

    return faction;
  }

  async update(
    id: string,
    data: {
      name?: string;
      description?: string;
      campaignId?: string;
    },
  ) {
    await this.findById(id);

    return this.factionRepository.update(id, data);
  }

  async delete(id: string) {
    await this.findById(id);

    return this.factionRepository.delete(id);
  }
}
