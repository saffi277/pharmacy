import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Governorate } from './governorate.entity';
import { CreateGovernorateDto } from './dto/create-governorate.dto';
import { UpdateGovernorateDto } from './dto/update-governorate.dto';

@Injectable()
export class GovernorateService {
  constructor(
    @InjectRepository(Governorate)
    private repo: Repository<Governorate>,
  ) {}

  findAll() {
    return this.repo.find({ order: { name_en: 'ASC' } });
  }

  async findOne(id: number) {
    const gov = await this.repo.findOne({ where: { id } });
    if (!gov) throw new NotFoundException(`Governorate #${id} not found`);
    return gov;
  }

  create(dto: CreateGovernorateDto) {
    const gov = this.repo.create(dto);
    return this.repo.save(gov);
  }

  async update(id: number, dto: UpdateGovernorateDto) {
    const gov = await this.findOne(id);
    Object.assign(gov, dto);
    return this.repo.save(gov);
  }

  async remove(id: number) {
    const gov = await this.findOne(id);
    return this.repo.remove(gov);
  }
}
