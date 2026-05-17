import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { OrderItem } from '../order-item/order-item.entity';
import { PharmacyProduct } from '../pharmacy-product/pharmacy-product.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { User, UserRole } from '../user/user.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private repo: Repository<Order>,
    @InjectRepository(OrderItem) private itemRepo: Repository<OrderItem>,
    @InjectRepository(PharmacyProduct) private ppRepo: Repository<PharmacyProduct>,
  ) {}

  findAll() {
    return this.repo.find({ relations: ['customer', 'pharmacy', 'items'], order: { created_at: 'DESC' } });
  }

  findByCustomer(customerId: number) {
    return this.repo.find({
      where: { customer_id: customerId },
      relations: ['pharmacy', 'items', 'items.pharmacy_product', 'items.pharmacy_product.product'],
      order: { created_at: 'DESC' },
    });
  }

  findByPharmacy(pharmacyId: number) {
    return this.repo.find({
      where: { pharmacy_id: pharmacyId },
      relations: ['customer', 'items', 'items.pharmacy_product', 'items.pharmacy_product.product'],
      order: { created_at: 'DESC' },
    });
  }

  async findOne(id: number) {
    const order = await this.repo.findOne({
      where: { id },
      relations: ['customer', 'pharmacy', 'items', 'items.pharmacy_product', 'items.pharmacy_product.product'],
    });
    if (!order) throw new NotFoundException(`Order #${id} not found`);
    return order;
  }

  async create(dto: CreateOrderDto, user: User) {
    let totalPrice = 0;
    const itemsData: Partial<OrderItem>[] = [];

    for (const item of dto.items) {
      const pp = await this.ppRepo.findOne({ where: { id: item.pharmacy_product_id, is_available: true } });
      if (!pp) throw new BadRequestException(`Product #${item.pharmacy_product_id} not available`);
      if (pp.quantity < item.quantity) throw new BadRequestException(`Insufficient stock for product #${item.pharmacy_product_id}`);
      totalPrice += Number(pp.price) * item.quantity;
      itemsData.push({ pharmacy_product_id: pp.id, quantity: item.quantity, unit_price: pp.price });
    }

    const order = this.repo.create({
      customer_id: user.id,
      pharmacy_id: dto.pharmacy_id,
      address: dto.address,
      latitude: dto.latitude,
      longitude: dto.longitude,
      notes: dto.notes,
      delivery_fee: 0,
      total_price: totalPrice,
    });

    const savedOrder = await this.repo.save(order);

    for (const item of itemsData) {
      await this.itemRepo.save(this.itemRepo.create({ ...item, order_id: savedOrder.id }));
    }

    return this.findOne(savedOrder.id);
  }

  async updateStatus(id: number, dto: UpdateOrderDto, user: User) {
    const order = await this.repo.findOne({ where: { id } });
    if (!order) throw new NotFoundException(`Order #${id} not found`);
    if (user.role === UserRole.CUSTOMER && order.customer_id !== user.id) {
      throw new ForbiddenException('Access denied');
    }
    Object.assign(order, dto);
    return this.repo.save(order);
  }

  async cancel(id: number, user: User) {
    const order = await this.repo.findOne({ where: { id } });
    if (!order) throw new NotFoundException(`Order #${id} not found`);
    if (user.role !== UserRole.ADMIN && order.customer_id !== user.id) {
      throw new ForbiddenException('Access denied');
    }
    order.status = 'cancelled' as any;
    return this.repo.save(order);
  }
}
