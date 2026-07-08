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

import { TurnService } from './turn.service';
import { CreateTurnDto } from './dto/create-turn.dto';

@ApiTags('turns')
@Controller('turns')
export class TurnController {
  constructor(private readonly turnService: TurnService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new turn' })
  @ApiResponse({
    status: 201,
    description: 'Turn created successfully',
  })
  create(@Body() createTurnDto: CreateTurnDto) {
    return this.turnService.create(createTurnDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all turns' })
  @ApiResponse({
    status: 200,
    description: 'List of turns',
  })
  findAll() {
    return this.turnService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a turn by id' })
  @ApiResponse({
    status: 200,
    description: 'Turn found',
  })
  @ApiResponse({
    status: 404,
    description: 'Turn not found',
  })
  findById(@Param('id') id: string) {
    return this.turnService.findById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a turn' })
  @ApiResponse({
    status: 200,
    description: 'Turn updated successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Turn not found',
  })
  update(
    @Param('id') id: string,
    @Body()
    data: {
      number?: number;
      campaignId?: string;
      status?: string;
    },
  ) {
    return this.turnService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a turn' })
  @ApiResponse({
    status: 200,
    description: 'Turn deleted successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Turn not found',
  })
  delete(@Param('id') id: string) {
    return this.turnService.delete(id);
  }
}
