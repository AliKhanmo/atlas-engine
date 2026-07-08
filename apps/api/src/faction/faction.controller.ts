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

import { FactionService } from './faction.service';
import { CreateFactionDto } from './dto/create-faction.dto';

@ApiTags('factions')
@Controller('factions')
export class FactionController {
  constructor(private readonly factionService: FactionService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new faction' })
  @ApiResponse({
    status: 201,
    description: 'Faction created successfully',
  })
  create(@Body() createFactionDto: CreateFactionDto) {
    return this.factionService.create(createFactionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all factions' })
  @ApiResponse({
    status: 200,
    description: 'List of factions',
  })
  findAll() {
    return this.factionService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a faction by id' })
  @ApiResponse({
    status: 200,
    description: 'Faction found',
  })
  @ApiResponse({
    status: 404,
    description: 'Faction not found',
  })
  findById(@Param('id') id: string) {
    return this.factionService.findById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a faction' })
  @ApiResponse({
    status: 200,
    description: 'Faction updated successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Faction not found',
  })
  update(
    @Param('id') id: string,
    @Body()
    data: {
      name?: string;
      description?: string;
      campaignId?: string;
    },
  ) {
    return this.factionService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a faction' })
  @ApiResponse({
    status: 200,
    description: 'Faction deleted successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Faction not found',
  })
  delete(@Param('id') id: string) {
    return this.factionService.delete(id);
  }
}
