import { Injectable, NotFoundException } from '@nestjs/common';
import { GameRepository } from './game.repository';
import { CreateGameDto } from './dto/create-game.dto';

@Injectable()
export class GameService {
  constructor(private readonly gameRepository: GameRepository) {}

  async create(data: CreateGameDto) {
    return this.gameRepository.create(data);
  }

  async findAll() {
    return this.gameRepository.findAll();
  }

  async findById(id: string) {
    const game = await this.gameRepository.findById(id);

    if (!game) {
      throw new NotFoundException(`Game ${id} not found`);
    }

    return game;
  }

  async update(
    id: string,
    data: {
      name?: string;
      description?: string;
    },
  ) {
    await this.findById(id);

    return this.gameRepository.update(id, data);
  }

  async delete(id: string) {
    await this.findById(id);

    return this.gameRepository.delete(id);
  }
}
