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

import { HouseService } from './house.service';
import { CreateHouseDto } from './dto/create-house.dto';
import { UpdateHouseDto } from './dto/update-house.dto';

@ApiTags('houses')
@Controller('houses')
export class HouseController {
  constructor(private readonly houseService: HouseService) {}

  @Post()
  @ApiOperation({ summary: 'Create house' })
  @ApiResponse({ status: 201 })
  create(@Body() dto: CreateHouseDto) {
    return this.houseService.create(dto);
  }

  @Get('telegram/:chatId')
  @ApiOperation({
    summary: 'Get house by telegram chat id',
  })
  findByTelegramChatId(@Param('chatId') chatId: string) {
    return this.houseService.findByTelegramChatId(chatId);
  }

  @Get('faction/:factionId')
  @ApiOperation({
    summary: 'Get houses of a faction',
  })
  findAllByFaction(@Param('factionId') factionId: string) {
    return this.houseService.findAllByFaction(factionId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get house by id' })
  findById(@Param('id') id: string) {
    return this.houseService.findById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update house' })
  update(@Param('id') id: string, @Body() dto: UpdateHouseDto) {
    return this.houseService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete house' })
  delete(@Param('id') id: string) {
    return this.houseService.delete(id);
  }
}
