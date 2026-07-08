import { PartialType } from '@nestjs/swagger';
import { CreateResourceTypeDto } from './create-resourceType.dto';

export class UpdateResourceTypeDto extends PartialType(CreateResourceTypeDto) {}
