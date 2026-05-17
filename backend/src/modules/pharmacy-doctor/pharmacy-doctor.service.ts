import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PharmacyDoctor } from './pharmacy-doctor.entity';
import { CreatePharmacyDoctorDto } from './dto/create-pharmacy-doctor.dto';
import { UpdatePharmacyDoctorDto } from './dto/update-pharmacy-doctor.dto';

@Injectable()
export class PharmacyDoctorService {
  constructor(@InjectRepository(PharmacyDoctor) private repo: Repository<PharmacyDoctor>) {}

  findByPharmacy(pharmacyId: number) {
    return this.repo.find({ where: { pharmacy_id: pharmacyId } });
  }

  async findOne(id: number) {
    const doc = await this.repo.findOne({ where: { id } });
    if (!doc) throw new NotFoundException(`Doctor #${id} not found`);
    return doc;
  }

  create(dto: CreatePharmacyDoctorDto) { return this.repo.save(this.repo.create(dto)); }

  async update(id: number, dto: UpdatePharmacyDoctorDto) {
    const doc = await this.findOne(id);
    Object.assign(doc, dto);
    return this.repo.save(doc);
  }

  async remove(id: number) {
    const doc = await this.findOne(id);
    return this.repo.remove(doc);
  }
}
