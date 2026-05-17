import { IsInt, IsString, IsOptional, Min, Max } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateReviewDto {
  @ApiProperty() @IsInt() @Type(() => Number) pharmacy_id: number;
  @ApiProperty({ minimum: 1, maximum: 5 }) @IsInt() @Min(1) @Max(5) @Type(() => Number) rating: number;
  @ApiPropertyOptional() @IsOptional() @IsString() comment?: string;
}
