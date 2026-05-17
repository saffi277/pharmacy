import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PharmacyDoctor } from './pharmacy-doctor.entity';
import { PharmacyDoctorService } from './pharmacy-doctor.service';
import { PharmacyDoctorController } from './pharmacy-doctor.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PharmacyDoctor])],
  providers: [PharmacyDoctorService],
  controllers: [PharmacyDoctorController],
  exports: [PharmacyDoctorService],
})
export class PharmacyDoctorModule {}
