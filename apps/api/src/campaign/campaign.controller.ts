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

import { CampaignService } from './campaign.service';
import { CreateCampaignDto } from './dto/create-campaign.dto';

@ApiTags('campaigns')
@Controller('campaigns')
export class CampaignController {
  constructor(private readonly campaignService: CampaignService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new campaign' })
  @ApiResponse({
    status: 201,
    description: 'Campaign created successfully',
  })
  create(@Body() createCampaignDto: CreateCampaignDto) {
    return this.campaignService.create(createCampaignDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all campaigns' })
  @ApiResponse({
    status: 200,
    description: 'List of campaigns',
  })
  findAll() {
    return this.campaignService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a campaign by id' })
  @ApiResponse({
    status: 200,
    description: 'Campaign found',
  })
  @ApiResponse({
    status: 404,
    description: 'Campaign not found',
  })
  findById(@Param('id') id: string) {
    return this.campaignService.findById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a campaign' })
  @ApiResponse({
    status: 200,
    description: 'Campaign updated successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Campaign not found',
  })
  update(
    @Param('id') id: string,
    @Body()
    data: {
      name?: string;
      gameId?: string;
    },
  ) {
    return this.campaignService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a campaign' })
  @ApiResponse({
    status: 200,
    description: 'Campaign deleted successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Campaign not found',
  })
  delete(@Param('id') id: string) {
    return this.campaignService.delete(id);
  }
}
