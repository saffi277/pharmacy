import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions } from 'typeorm';
import { Pharmacy } from './pharmacy.entity';
import { CreatePharmacyDto } from './dto/create-pharmacy.dto';
import { UpdatePharmacyDto } from './dto/update-pharmacy.dto';
import { User, UserRole } from '../user/user.entity';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

@Injectable()
export class PharmacyService {
  constructor(
    @InjectRepository(Pharmacy)
    private repo: Repository<Pharmacy>,
  ) {}

  findAll(governorateId?: number) {
    const where: any = { is_active: true };
    if (governorateId) where.governorate_id = governorateId;
    return this.repo.find({
      where,
      relations: ['governorate'],
      order: { created_at: 'DESC' },
    });
  }

  async findOne(id: number) {
    const pharmacy = await this.repo.findOne({
      where: { id },
      relations: ['governorate', 'working_hours', 'doctors'],
    });
    if (!pharmacy) throw new NotFoundException(`Pharmacy #${id} not found`);
    return pharmacy;
  }

  async findBySlug(slug: string) {
    const pharmacy = await this.repo.findOne({
      where: { slug },
      relations: ['governorate', 'working_hours', 'doctors'],
    });
    if (!pharmacy) throw new NotFoundException(`Pharmacy not found`);
    return pharmacy;
  }

  async create(dto: CreatePharmacyDto, user: User) {
    const baseSlug = slugify(dto.name);
    let slug = baseSlug;
    let count = 1;
    while (await this.repo.findOne({ where: { slug } })) {
      slug = `${baseSlug}-${count++}`;
    }
    const pharmacy = this.repo.create({ ...dto, user_id: user.id, slug });
    return this.repo.save(pharmacy);
  }

  async update(id: number, dto: UpdatePharmacyDto, user: User) {
    const pharmacy = await this.repo.findOne({ where: { id } });
    if (!pharmacy) throw new NotFoundException(`Pharmacy #${id} not found`);
    if (user.role !== UserRole.ADMIN && pharmacy.user_id !== user.id) {
      throw new ForbiddenException('Access denied');
    }
    Object.assign(pharmacy, dto);
    return this.repo.save(pharmacy);
  }

  async remove(id: number, user: User) {
    const pharmacy = await this.repo.findOne({ where: { id } });
    if (!pharmacy) throw new NotFoundException(`Pharmacy #${id} not found`);
    if (user.role !== UserRole.ADMIN && pharmacy.user_id !== user.id) {
      throw new ForbiddenException('Access denied');
    }
    return this.repo.remove(pharmacy);
  }

  async verify(id: number) {
    const pharmacy = await this.repo.findOne({ where: { id } });
    if (!pharmacy) throw new NotFoundException(`Pharmacy #${id} not found`);
    pharmacy.is_verified = true;
    return this.repo.save(pharmacy);
  }

  findByOwner(userId: number) {
    return this.repo.find({ where: { user_id: userId }, relations: ['governorate'] });
  }
}
