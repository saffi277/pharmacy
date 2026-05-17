import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Pharmacy } from '../pharmacy/pharmacy.entity';

@Entity('pharmacy_doctors')
export class PharmacyDoctor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  pharmacy_id: number;

  @Column({ length: 150 })
  name: string;

  @Column({ length: 150, nullable: true })
  specialty: string;

  @Column({ length: 20, nullable: true })
  phone: string;

  @Column({ default: true })
  is_available: boolean;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Pharmacy, (pharmacy) => pharmacy.doctors)
  @JoinColumn({ name: 'pharmacy_id' })
  pharmacy: Pharmacy;
}
