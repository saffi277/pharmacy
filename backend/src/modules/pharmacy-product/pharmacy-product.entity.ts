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
import { Pharmacy } from '../pharmacy/pharmacy.entity';
import { Product } from '../product/product.entity';
import { OrderItem } from '../order-item/order-item.entity';

@Entity('pharmacy_products')
export class PharmacyProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  pharmacy_id: number;

  @Column()
  product_id: number;

  @Column({ type: 'decimal', precision: 10, scale: 3 })
  price: number;

  @Column({ type: 'int', default: 0 })
  quantity: number;

  @Column({ default: true })
  is_available: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Pharmacy, (pharmacy) => pharmacy.products)
  @JoinColumn({ name: 'pharmacy_id' })
  pharmacy: Pharmacy;

  @ManyToOne(() => Product, (product) => product.pharmacy_products)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @OneToMany(() => OrderItem, (item) => item.pharmacy_product)
  order_items: OrderItem[];
}
