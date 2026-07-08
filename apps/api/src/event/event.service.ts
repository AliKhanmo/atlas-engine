import { Injectable, NotFoundException } from '@nestjs/common';

import { EventRepository } from './event.repository';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventService {
  constructor(private readonly repository: EventRepository) {}

  create(dto: CreateEventDto) {
    return this.repository.create(dto);
  }

  findAll() {
    return this.repository.findAll();
  }

  async findById(id: string) {
    const event = await this.repository.findById(id);

    if (!event) {
      throw new NotFoundException(`Event ${id} not found`);
    }

    return event;
  }

  async update(id: string, dto: UpdateEventDto) {
    await this.findById(id);

    return this.repository.update(id, dto);
  }

  async delete(id: string) {
    await this.findById(id);

    return this.repository.delete(id);
  }
}
