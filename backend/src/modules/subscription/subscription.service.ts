import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscription } from './subscription.entity';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';

@Injectable()
export class SubscriptionService {
  constructor(@InjectRepository(Subscription) private repo: Repository<Subscription>) {}

  findAll() { return this.repo.find({ relations: ['pharmacy', 'plan'], order: { created_at: 'DESC' } }); }

  findByPharmacy(pharmacyId: number) {
    return this.repo.find({ where: { pharmacy_id: pharmacyId }, relations: ['plan'], order: { created_at: 'DESC' } });
  }

  async findOne(id: number) {
    const sub = await this.repo.findOne({ where: { id }, relations: ['pharmacy', 'plan'] });
    if (!sub) throw new NotFoundException(`Subscription #${id} not found`);
    return sub;
  }

  create(dto: CreateSubscriptionDto) { return this.repo.save(this.repo.create(dto)); }

  async update(id: number, dto: UpdateSubscriptionDto) {
    const sub = await this.repo.findOne({ where: { id } });
    if (!sub) throw new NotFoundException(`Subscription #${id} not found`);
    Object.assign(sub, dto);
    return this.repo.save(sub);
  }

  async cancel(id: number) {
    const sub = await this.repo.findOne({ where: { id } });
    if (!sub) throw new NotFoundException(`Subscription #${id} not found`);
    sub.status = 'cancelled' as any;
    return this.repo.save(sub);
  }
}
