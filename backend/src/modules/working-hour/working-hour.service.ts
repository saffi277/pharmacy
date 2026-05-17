import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkingHour } from './working-hour.entity';
import { CreateWorkingHourDto } from './dto/create-working-hour.dto';
import { UpdateWorkingHourDto } from './dto/update-working-hour.dto';

@Injectable()
export class WorkingHourService {
  constructor(@InjectRepository(WorkingHour) private repo: Repository<WorkingHour>) {}

  findByPharmacy(pharmacyId: number) {
    return this.repo.find({ where: { pharmacy_id: pharmacyId }, order: { day: 'ASC' } });
  }

  async findOne(id: number) {
    const wh = await this.repo.findOne({ where: { id } });
    if (!wh) throw new NotFoundException(`WorkingHour #${id} not found`);
    return wh;
  }

  create(dto: CreateWorkingHourDto) {
    return this.repo.save(this.repo.create(dto));
  }

  async update(id: number, dto: UpdateWorkingHourDto) {
    const wh = await this.findOne(id);
    Object.assign(wh, dto);
    return this.repo.save(wh);
  }

  async remove(id: number) {
    const wh = await this.findOne(id);
    return this.repo.remove(wh);
  }
}
