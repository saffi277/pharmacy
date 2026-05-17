import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Pharmacy } from '../pharmacy/pharmacy.entity';

export enum DayOfWeek {
  SATURDAY = 'saturday',
  SUNDAY = 'sunday',
  MONDAY = 'monday',
  TUESDAY = 'tuesday',
  WEDNESDAY = 'wednesday',
  THURSDAY = 'thursday',
  FRIDAY = 'friday',
}

@Entity('working_hours')
export class WorkingHour {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  pharmacy_id: number;

  @Column({ type: 'enum', enum: DayOfWeek })
  day: DayOfWeek;

  @Column({ type: 'time', nullable: true })
  open_time: string;

  @Column({ type: 'time', nullable: true })
  close_time: string;

  @Column({ default: false })
  is_closed: boolean;

  @ManyToOne(() => Pharmacy, (pharmacy) => pharmacy.working_hours)
  @JoinColumn({ name: 'pharmacy_id' })
  pharmacy: Pharmacy;
}
