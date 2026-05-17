import { IsString, IsNumber, IsInt, IsBoolean, IsOptional, IsObject } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateSubscriptionPlanDto {
  @ApiProperty() @IsString() name: string;
  @ApiProperty() @IsNumber() @Type(() => Number) price_monthly: number;
  @ApiProperty() @IsInt() @Type(() => Number) max_products: number;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() has_delivery?: boolean;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() has_verified_badge?: boolean;
  @ApiPropertyOptional() @IsOptional() @IsObject() features?: Record<string, any>;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() is_active?: boolean;
}
