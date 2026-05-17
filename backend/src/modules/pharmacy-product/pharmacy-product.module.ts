import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PharmacyProduct } from './pharmacy-product.entity';
import { PharmacyProductService } from './pharmacy-product.service';
import { PharmacyProductController } from './pharmacy-product.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PharmacyProduct])],
  providers: [PharmacyProductService],
  controllers: [PharmacyProductController],
  exports: [PharmacyProductService],
})
export class PharmacyProductModule {}
