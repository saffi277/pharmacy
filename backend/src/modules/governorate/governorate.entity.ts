import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Pharmacy } from '../pharmacy/pharmacy.entity';

@Entity('governorates')
export class Governorate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name_ar: string;

  @Column({ length: 100 })
  name_en: string;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => Pharmacy, (pharmacy) => pharmacy.governorate)
  pharmacies: Pharmacy[];
}
