import { IsNumber, IsInt, IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreatePharmacyProductDto {
  @ApiProperty() @IsInt() @Type(() => Number) pharmacy_id: number;
  @ApiProperty() @IsInt() @Type(() => Number) product_id: number;
  @ApiProperty() @IsNumber() @Type(() => Number) price: number;
  @ApiProperty() @IsInt() @Type(() => Number) quantity: number;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() is_available?: boolean;
}
