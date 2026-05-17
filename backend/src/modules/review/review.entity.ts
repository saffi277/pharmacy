import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Check,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Pharmacy } from '../pharmacy/pharmacy.entity';

@Entity('reviews')
@Check('"rating" >= 1 AND "rating" <= 5')
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  customer_id: number;

  @Column()
  pharmacy_id: number;

  @Column({ type: 'int' })
  rating: number;

  @Column({ type: 'text', nullable: true })
  comment: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User, (user) => user.reviews)
  @JoinColumn({ name: 'customer_id' })
  customer: User;

  @ManyToOne(() => Pharmacy, (pharmacy) => pharmacy.reviews)
  @JoinColumn({ name: 'pharmacy_id' })
  pharmacy: Pharmacy;
}
