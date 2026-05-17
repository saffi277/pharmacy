import { IsString, IsOptional, IsBoolean, IsInt, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreatePharmacyDoctorDto {
  @ApiProperty() @IsInt() @Type(() => Number) pharmacy_id: number;
  @ApiProperty() @IsString() @MaxLength(150) name: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(100) specialty?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(20) phone?: string;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() is_available?: boolean;
}
