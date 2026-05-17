import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { Subscription } from '../subscription/subscription.entity';

@Entity('subscription_plans')
export class SubscriptionPlan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 3 })
  price_monthly: number;

  @Column({ type: 'int', default: 0 })
  max_products: number;

  @Column({ default: false })
  has_delivery: boolean;

  @Column({ default: false })
  has_verified_badge: boolean;

  @Column({ type: 'jsonb', nullable: true })
  features: Record<string, any>;

  @Column({ default: true })
  is_active: boolean;

  @OneToMany(() => Subscription, (sub) => sub.plan)
  subscriptions: Subscription[];
}
