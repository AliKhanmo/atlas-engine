import { Injectable, NotFoundException } from '@nestjs/common';
import { FactionResourceRepository } from './factionResource.repository';
import { CreateFactionResourceDto } from './dto/create-factionResource.dto';
import { UpdateFactionResourceDto } from './dto/update-factionResource.dto';

@Injectable()
export class FactionResourceService {
  constructor(private readonly repository: FactionResourceRepository) {}

  create(dto: CreateFactionResourceDto) {
    return this.repository.create(dto);
  }

  findAll() {
    return this.repository.findAll();
  }

  async findById(id: string) {
    const resource = await this.repository.findById(id);

    if (!resource) {
      throw new NotFoundException(`FactionResource ${id} not found`);
    }

    return resource;
  }

  async update(id: string, dto: UpdateFactionResourceDto) {
    await this.findById(id);

    return this.repository.update(id, dto);
  }

  async delete(id: string) {
    await this.findById(id);

    return this.repository.delete(id);
  }
}
