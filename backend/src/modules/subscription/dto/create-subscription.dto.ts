import { IsInt, IsString, IsOptional, IsEnum, IsNumber, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { SubscriptionStatus } from '../subscription.entity';

export class CreateSubscriptionDto {
  @ApiProperty() @IsInt() @Type(() => Number) pharmacy_id: number;
  @ApiProperty() @IsInt() @Type(() => Number) plan_id: number;
  @ApiProperty() @IsDateString() starts_at: string;
  @ApiProperty() @IsDateString() ends_at: string;
  @ApiPropertyOptional({ enum: SubscriptionStatus }) @IsOptional() @IsEnum(SubscriptionStatus) status?: SubscriptionStatus;
  @ApiPropertyOptional() @IsOptional() @IsString() payment_method?: string;
  @ApiProperty() @IsNumber() @Type(() => Number) amount_paid: number;
}
