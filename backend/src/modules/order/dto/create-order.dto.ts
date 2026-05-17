import { IsInt, IsString, IsOptional, IsNumber, IsArray, ValidateNested } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class OrderItemInputDto {
  @ApiProperty() @IsInt() @Type(() => Number) pharmacy_product_id: number;
  @ApiProperty() @IsInt() @Type(() => Number) quantity: number;
}

export class CreateOrderDto {
  @ApiProperty() @IsInt() @Type(() => Number) pharmacy_id: number;
  @ApiPropertyOptional() @IsOptional() @IsString() address?: string;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Type(() => Number) latitude?: number;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Type(() => Number) longitude?: number;
  @ApiPropertyOptional() @IsOptional() @IsString() notes?: string;
  @ApiProperty({ type: [OrderItemInputDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemInputDto)
  items: OrderItemInputDto[];
}
