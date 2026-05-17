import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Governorate } from '../governorate/governorate.entity';
import { WorkingHour } from '../working-hour/working-hour.entity';
import { PharmacyDoctor } from '../pharmacy-doctor/pharmacy-doctor.entity';
import { PharmacyProduct } from '../pharmacy-product/pharmacy-product.entity';
import { Subscription } from '../subscription/subscription.entity';
import { Order } from '../order/order.entity';
import { Review } from '../review/review.entity';

@Entity('pharmacies')
export class Pharmacy {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  governorate_id: number;

  @Column({ length: 200 })
  name: string;

  @Column({ unique: true, length: 255 })
  slug: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'text' })
  address: string;

  @Column({ type: 'decimal', precision: 10, scale: 8, nullable: true })
  latitude: number;

  @Column({ type: 'decimal', precision: 11, scale: 8, nullable: true })
  longitude: number;

  @Column({ length: 20, nullable: true })
  phone: string;

  @Column({ nullable: true })
  logo: string;

  @Column({ nullable: true })
  cover_image: string;

  @Column({ default: false })
  has_delivery: boolean;

  @Column({ default: true })
  is_active: boolean;

  @Column({ default: false })
  is_verified: boolean;

  @Column({ default: false })
  working_24h: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.pharmacies)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Governorate, (gov) => gov.pharmacies)
  @JoinColumn({ name: 'governorate_id' })
  governorate: Governorate;

  @OneToMany(() => WorkingHour, (wh) => wh.pharmacy)
  working_hours: WorkingHour[];

  @OneToMany(() => PharmacyDoctor, (doc) => doc.pharmacy)
  doctors: PharmacyDoctor[];

  @OneToMany(() => PharmacyProduct, (pp) => pp.pharmacy)
  products: PharmacyProduct[];

  @OneToMany(() => Subscription, (sub) => sub.pharmacy)
  subscriptions: Subscription[];

  @OneToMany(() => Order, (order) => order.pharmacy)
  orders: Order[];

  @OneToMany(() => Review, (review) => review.pharmacy)
  reviews: Review[];
}
