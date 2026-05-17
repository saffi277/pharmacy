import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PharmacyProduct } from './pharmacy-product.entity';
import { CreatePharmacyProductDto } from './dto/create-pharmacy-product.dto';
import { UpdatePharmacyProductDto } from './dto/update-pharmacy-product.dto';

@Injectable()
export class PharmacyProductService {
  constructor(@InjectRepository(PharmacyProduct) private repo: Repository<PharmacyProduct>) {}

  findByPharmacy(pharmacyId: number) {
    return this.repo.find({
      where: { pharmacy_id: pharmacyId, is_available: true },
      relations: ['product', 'product.category'],
    });
  }

  async findOne(id: number) {
    const pp = await this.repo.findOne({ where: { id }, relations: ['product', 'pharmacy'] });
    if (!pp) throw new NotFoundException(`PharmacyProduct #${id} not found`);
    return pp;
  }

  create(dto: CreatePharmacyProductDto) { return this.repo.save(this.repo.create(dto)); }

  async update(id: number, dto: UpdatePharmacyProductDto) {
    const pp = await this.repo.findOne({ where: { id } });
    if (!pp) throw new NotFoundException(`PharmacyProduct #${id} not found`);
    Object.assign(pp, dto);
    return this.repo.save(pp);
  }

  async remove(id: number) {
    const pp = await this.repo.findOne({ where: { id } });
    if (!pp) throw new NotFoundException(`PharmacyProduct #${id} not found`);
    return this.repo.remove(pp);
  }
}
