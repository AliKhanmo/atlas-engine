import { Injectable, NotFoundException } from '@nestjs/common';
import { HouseRepository } from './house.repository';
import { CreateHouseDto } from './dto/create-house.dto';
import { UpdateHouseDto } from './dto/update-house.dto';

@Injectable()
export class HouseService {
  constructor(private readonly repository: HouseRepository) {}

  async create(dto: CreateHouseDto) {
    return this.repository.create(dto);
  }

  async findById(id: string) {
    const house = await this.repository.findById(id);

    if (!house) {
      throw new NotFoundException(`House ${id} not found`);
    }

    return house;
  }

  async findByTelegramChatId(chatId: string) {
    const house = await this.repository.findByTelegramChatId(chatId);

    if (!house) {
      throw new NotFoundException(
        `House with telegram chat id ${chatId} not found`,
      );
    }

    return house;
  }

  async findAllByFaction(factionId: string) {
    return this.repository.findAllByFaction(factionId);
  }

  async update(id: string, dto: UpdateHouseDto) {
    await this.findById(id);

    return this.repository.update(id, dto);
  }

  async delete(id: string) {
    await this.findById(id);

    return this.repository.delete(id);
  }
}
