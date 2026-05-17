import {
  IsString, IsOptional, IsNumber, IsBoolean, MaxLength, IsInt,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreatePharmacyDto {
  @ApiProperty() @IsInt() @Type(() => Number) governorate_id: number;
  @ApiProperty() @IsString() @MaxLength(200) name: string;
  @ApiPropertyOptional() @IsOptional() @IsString() description?: string;
  @ApiProperty() @IsString() address: string;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Type(() => Number) latitude?: number;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Type(() => Number) longitude?: number;
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(20) phone?: string;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() has_delivery?: boolean;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() working_24h?: boolean;
}
