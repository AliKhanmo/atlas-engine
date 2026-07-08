import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { PlayerRepository } from './player.repository';

@Injectable()
export class PlayerService {
  constructor(private readonly playerRepository: PlayerRepository) {}

  create(createPlayerDto: CreatePlayerDto) {
    return this.playerRepository.create(createPlayerDto);
  }

  findAll() {
    return this.playerRepository.findAll();
  }

  async findById(id: string) {
    const player = await this.playerRepository.findById(id);

    if (!player) {
      throw new NotFoundException(`Player ${id} not found`);
    }

    return player;
  }

  async update(id: string, updatePlayerDto: UpdatePlayerDto) {
    await this.findById(id);

    return this.playerRepository.update(id, updatePlayerDto);
  }

  async delete(id: string) {
    await this.findById(id);

    return this.playerRepository.delete(id);
  }
}
