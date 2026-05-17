import { PartialType } from '@nestjs/swagger';
import { CreatePharmacyProductDto } from './create-pharmacy-product.dto';
export class UpdatePharmacyProductDto extends PartialType(CreatePharmacyProductDto) {}
