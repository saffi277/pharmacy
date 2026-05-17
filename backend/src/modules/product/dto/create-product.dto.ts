import { IsString, IsOptional, IsBoolean, IsInt, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @ApiProperty() @IsInt() @Type(() => Number) category_id: number;
  @ApiProperty() @IsString() @MaxLength(200) name_ar: string;
  @ApiProperty() @IsString() @MaxLength(200) name_en: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(100) barcode?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() description?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() image?: string;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() requires_prescription?: boolean;
}
