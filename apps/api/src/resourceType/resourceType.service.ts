import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ResourceTypeRepository } from './resourceType.repository';
import { CreateResourceTypeDto } from './dto/create-resourceType.dto';
import { UpdateResourceTypeDto } from './dto/update-resourceType.dto';


@Injectable()
export class ResourceTypeService {
  constructor(
    private readonly resourceTypeRepository: ResourceTypeRepository,
  ) {}

  create(dto: CreateResourceTypeDto) {
    return this.resourceTypeRepository.create(dto);
  }

  findAll() {
    return this.resourceTypeRepository.findAll();
  }

  async findById(id: string) {
    const resource =
      await this.resourceTypeRepository.findById(id);

    if (!resource) {
      throw new NotFoundException(
        `ResourceType ${id} not found`,
      );
    }

    return resource;
  }

  async update(
    id: string,
    dto: UpdateResourceTypeDto,
  ) {
    await this.findById(id);

    return this.resourceTypeRepository.update(
      id,
      dto,
    );
  }

  async delete(id: string) {
    await this.findById(id);

    return this.resourceTypeRepository.delete(id);
  }
}