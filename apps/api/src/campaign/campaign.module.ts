import { Module } from '@nestjs/common';

import { CampaignRepository } from './campaign.repository';
import { CampaignService } from './campaign.service';
import { CampaignController } from './campaign.controller';

@Module({
  controllers: [CampaignController],
  providers: [CampaignRepository, CampaignService],
  exports: [CampaignService],
})
export class CampaignModule {}
