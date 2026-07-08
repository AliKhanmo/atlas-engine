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
import { FactionMemberService } from './factionMember.service';
import { CreateFactionMemberDto } from './dto/create-factionMember.dto';
import { UpdateFactionMemberDto } from './dto/update-factionMember.dto';

@ApiTags('Faction Members')
@Controller('faction-members')
export class FactionMemberController {
  constructor(private readonly service: FactionMemberService) {}

  @Post()
  @ApiOperation({ summary: 'Create faction member' })
  @ApiResponse({
    status: 201,
    description: 'Faction member created successfully',
  })
  create(@Body() dto: CreateFactionMemberDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all faction members' })
  @ApiResponse({
    status: 200,
    description: 'List of faction members',
  })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get faction member by id' })
  @ApiResponse({
    status: 200,
    description: 'Faction member found',
  })
  @ApiResponse({
    status: 404,
    description: 'Faction member not found',
  })
  findById(@Param('id') id: string) {
    return this.service.findById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update faction member' })
  @ApiResponse({
    status: 200,
    description: 'Faction member updated successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Faction member not found',
  })
  update(@Param('id') id: string, @Body() dto: UpdateFactionMemberDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete faction member' })
  @ApiResponse({
    status: 200,
    description: 'Faction member deleted successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Faction member not found',
  })
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
