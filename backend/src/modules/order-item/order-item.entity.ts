import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Order } from '../order/order.entity';
import { PharmacyProduct } from '../pharmacy-product/pharmacy-product.entity';

@Entity('order_items')
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  order_id: number;

  @Column()
  pharmacy_product_id: number;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 3 })
  unit_price: number;

  @ManyToOne(() => Order, (order) => order.items)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @ManyToOne(() => PharmacyProduct, (pp) => pp.order_items)
  @JoinColumn({ name: 'pharmacy_product_id' })
  pharmacy_product: PharmacyProduct;
}
