import { IsString, IsOptional, IsInt, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateCategoryDto {
  @ApiProperty() @IsString() @MaxLength(100) name_ar: string;
  @ApiProperty() @IsString() @MaxLength(100) name_en: string;
  @ApiPropertyOptional() @IsOptional() @IsString() icon?: string;
  @ApiPropertyOptional() @IsOptional() @IsInt() @Type(() => Number) parent_id?: number;
}
