import { PartialType } from '@nestjs/swagger';
import { CreateFactionResourceDto } from './create-factionResource.dto';

export class UpdateFactionResourceDto extends PartialType(
  CreateFactionResourceDto,
) {}
