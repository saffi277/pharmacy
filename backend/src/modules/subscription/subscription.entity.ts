import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Pharmacy } from '../pharmacy/pharmacy.entity';
import { SubscriptionPlan } from '../subscription-plan/subscription-plan.entity';

export enum SubscriptionStatus {
  ACTIVE = 'active',
  EXPIRED = 'expired',
  CANCELLED = 'cancelled',
}

@Entity('subscriptions')
export class Subscription {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  pharmacy_id: number;

  @Column()
  plan_id: number;

  @Column({ type: 'timestamp' })
  starts_at: Date;

  @Column({ type: 'timestamp' })
  ends_at: Date;

  @Column({
    type: 'enum',
    enum: SubscriptionStatus,
    default: SubscriptionStatus.ACTIVE,
  })
  status: SubscriptionStatus;

  @Column({ length: 100, nullable: true })
  payment_method: string;

  @Column({ type: 'decimal', precision: 10, scale: 3 })
  amount_paid: number;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Pharmacy, (pharmacy) => pharmacy.subscriptions)
  @JoinColumn({ name: 'pharmacy_id' })
  pharmacy: Pharmacy;

  @ManyToOne(() => SubscriptionPlan, (plan) => plan.subscriptions)
  @JoinColumn({ name: 'plan_id' })
  plan: SubscriptionPlan;
}
