import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkingHour } from './working-hour.entity';
import { WorkingHourService } from './working-hour.service';
import { WorkingHourController } from './working-hour.controller';

@Module({
  imports: [TypeOrmModule.forFeature([WorkingHour])],
  providers: [WorkingHourService],
  controllers: [WorkingHourController],
  exports: [WorkingHourService],
})
export class WorkingHourModule {}
