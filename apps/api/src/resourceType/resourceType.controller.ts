import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResourceTypeService } from './resourceType.service';
import { CreateResourceTypeDto } from './dto/create-resourceType.dto';
import { UpdateResourceTypeDto } from './dto/update-resourceType.dto';

@ApiTags('resource-types')
@Controller('resource-types')
export class ResourceTypeController {
  constructor(private readonly resourceTypeService: ResourceTypeService) {}

  @Post()
  @ApiOperation({
    summary: 'Create resource type',
  })
  @ApiResponse({
    status: 201,
    description: 'Resource type created',
  })
  create(@Body() dto: CreateResourceTypeDto) {
    return this.resourceTypeService.create(dto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all resource types',
  })
  findAll() {
    return this.resourceTypeService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get resource type by id',
  })
  findById(@Param('id') id: string) {
    return this.resourceTypeService.findById(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update resource type',
  })
  update(@Param('id') id: string, @Body() dto: UpdateResourceTypeDto) {
    return this.resourceTypeService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete resource type',
  })
  delete(@Param('id') id: string) {
    return this.resourceTypeService.delete(id);
  }
}
