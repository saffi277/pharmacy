import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(@InjectRepository(Category) private repo: Repository<Category>) {}

  findAll() {
    return this.repo.find({ where: { parent_id: null }, relations: ['children'] });
  }

  findAllFlat() { return this.repo.find({ order: { name_en: 'ASC' } }); }

  async findOne(id: number) {
    const cat = await this.repo.findOne({ where: { id }, relations: ['children', 'parent'] });
    if (!cat) throw new NotFoundException(`Category #${id} not found`);
    return cat;
  }

  create(dto: CreateCategoryDto) { return this.repo.save(this.repo.create(dto)); }

  async update(id: number, dto: UpdateCategoryDto) {
    const cat = await this.repo.findOne({ where: { id } });
    if (!cat) throw new NotFoundException(`Category #${id} not found`);
    Object.assign(cat, dto);
    return this.repo.save(cat);
  }

  async remove(id: number) {
    const cat = await this.repo.findOne({ where: { id } });
    if (!cat) throw new NotFoundException(`Category #${id} not found`);
    return this.repo.remove(cat);
  }
}
