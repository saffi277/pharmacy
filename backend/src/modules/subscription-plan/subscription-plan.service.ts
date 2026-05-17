import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubscriptionPlan } from './subscription-plan.entity';
import { CreateSubscriptionPlanDto } from './dto/create-subscription-plan.dto';
import { UpdateSubscriptionPlanDto } from './dto/update-subscription-plan.dto';

@Injectable()
export class SubscriptionPlanService {
  constructor(@InjectRepository(SubscriptionPlan) private repo: Repository<SubscriptionPlan>) {}

  findAll() { return this.repo.find({ where: { is_active: true }, order: { price_monthly: 'ASC' } }); }

  async findOne(id: number) {
    const plan = await this.repo.findOne({ where: { id } });
    if (!plan) throw new NotFoundException(`SubscriptionPlan #${id} not found`);
    return plan;
  }

  create(dto: CreateSubscriptionPlanDto) { return this.repo.save(this.repo.create(dto)); }

  async update(id: number, dto: UpdateSubscriptionPlanDto) {
    const plan = await this.findOne(id);
    Object.assign(plan, dto);
    return this.repo.save(plan);
  }

  async remove(id: number) {
    const plan = await this.findOne(id);
    return this.repo.remove(plan);
  }
}
