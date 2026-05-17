import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Category } from '../category/category.entity';
import { PharmacyProduct } from '../pharmacy-product/pharmacy-product.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  category_id: number;

  @Column({ length: 255 })
  name_ar: string;

  @Column({ length: 255 })
  name_en: string;

  @Column({ length: 100, nullable: true, unique: true })
  barcode: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ nullable: true })
  image: string;

  @Column({ default: false })
  requires_prescription: boolean;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @OneToMany(() => PharmacyProduct, (pp) => pp.product)
  pharmacy_products: PharmacyProduct[];
}
