import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Governorate } from './governorate.entity';
import { GovernorateService } from './governorate.service';
import { GovernorateController } from './governorate.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Governorate])],
  providers: [GovernorateService],
  controllers: [GovernorateController],
  exports: [GovernorateService],
})
export class GovernorateModule {}
