import { IsEnum, IsString, IsBoolean, IsOptional, IsInt } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { DayOfWeek } from '../working-hour.entity';

export class CreateWorkingHourDto {
  @ApiProperty() @IsInt() @Type(() => Number) pharmacy_id: number;
  @ApiProperty({ enum: DayOfWeek }) @IsEnum(DayOfWeek) day: DayOfWeek;
  @ApiPropertyOptional({ example: '08:00' }) @IsOptional() @IsString() open_time?: string;
  @ApiPropertyOptional({ example: '22:00' }) @IsOptional() @IsString() close_time?: string;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() is_closed?: boolean;
}
