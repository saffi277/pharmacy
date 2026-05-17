import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(@InjectRepository(Product) private repo: Repository<Product>) {}

  findAll(categoryId?: number, search?: string) {
    const where: any = {};
    if (categoryId) where.category_id = categoryId;
    if (search) where.name_en = ILike(`%${search}%`);
    return this.repo.find({ where, relations: ['category'], order: { name_en: 'ASC' } });
  }

  async findOne(id: number) {
    const product = await this.repo.findOne({ where: { id }, relations: ['category'] });
    if (!product) throw new NotFoundException(`Product #${id} not found`);
    return product;
  }

  findByBarcode(barcode: string) {
    return this.repo.findOne({ where: { barcode }, relations: ['category'] });
  }

  create(dto: CreateProductDto) { return this.repo.save(this.repo.create(dto)); }

  async update(id: number, dto: UpdateProductDto) {
    const product = await this.repo.findOne({ where: { id } });
    if (!product) throw new NotFoundException(`Product #${id} not found`);
    Object.assign(product, dto);
    return this.repo.save(product);
  }

  async remove(id: number) {
    const product = await this.repo.findOne({ where: { id } });
    if (!product) throw new NotFoundException(`Product #${id} not found`);
    return this.repo.remove(product);
  }
}
