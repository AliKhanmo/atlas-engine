import { Injectable, NotFoundException } from '@nestjs/common';
import { TurnRepository } from './turn.repository';
import { CreateTurnDto } from './dto/create-turn.dto';
import { UpdateTurnDto } from './dto/update-turn.dto';

@Injectable()
export class TurnService {
  constructor(private readonly turnRepository: TurnRepository) {}

  async create(data: CreateTurnDto) {
    return this.turnRepository.create(data);
  }

  async findAll() {
    return this.turnRepository.findAll();
  }

  async findById(id: string) {
    const turn = await this.turnRepository.findById(id);

    if (!turn) {
      throw new NotFoundException(`Turn ${id} not found`);
    }

    return turn;
  }

  async update(id: string, dto: UpdateTurnDto) {
    await this.findById(id);

    return this.turnRepository.update(id, dto);
  }

  async delete(id: string) {
    await this.findById(id);

    return this.turnRepository.delete(id);
  }
}
