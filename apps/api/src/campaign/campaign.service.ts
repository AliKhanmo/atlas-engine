import { Injectable, NotFoundException } from "@nestjs/common";
import { CampaignRepository } from "./campaign.repository";
import { CreateCampaignDto } from "./dto/create-campaign.dto";

@Injectable()
export class CampaignService {
  constructor(
    private readonly campaignRepository: CampaignRepository,
  ) {}

  async create(data: CreateCampaignDto) {
    return this.campaignRepository.create(data);
  }

  async findAll() {
    return this.campaignRepository.findAll();
  }

  async findById(id: string) {
    const campaign = await this.campaignRepository.findById(id);

    if (!campaign) {
      throw new NotFoundException(`Campaign ${id} not found`);
    }

    return campaign;
  }

  async update(
    id: string,
    data: {
      name?: string;
      gameId?: string;
    },
  ) {
    await this.findById(id);

    return this.campaignRepository.update(id, data);
  }

  async delete(id: string) {
    await this.findById(id);

    return this.campaignRepository.delete(id);
  }
}