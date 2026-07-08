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
import { FactionResourceService } from './factionResource.service';
import { CreateFactionResourceDto } from './dto/create-factionResource.dto';
import { UpdateFactionResourceDto } from './dto/update-factionResource.dto';

@ApiTags('Faction Resources')
@Controller('faction-resources')
export class FactionResourceController {
  constructor(private readonly service: FactionResourceService) {}

  @Post()
  @ApiOperation({ summary: 'Create faction resource' })
  @ApiResponse({ status: 201 })
  create(@Body() dto: CreateFactionResourceDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all faction resources' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get faction resource by id' })
  findById(@Param('id') id: string) {
    return this.service.findById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update faction resource' })
  update(@Param('id') id: string, @Body() dto: UpdateFactionResourceDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete faction resource' })
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
