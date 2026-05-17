import { Injectable, NotFoundException, ForbiddenException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { User, UserRole } from '../user/user.entity';

@Injectable()
export class ReviewService {
  constructor(@InjectRepository(Review) private repo: Repository<Review>) {}

  findByPharmacy(pharmacyId: number) {
    return this.repo.find({
      where: { pharmacy_id: pharmacyId },
      relations: ['customer'],
      order: { created_at: 'DESC' },
    });
  }

  async findOne(id: number) {
    const review = await this.repo.findOne({ where: { id }, relations: ['customer', 'pharmacy'] });
    if (!review) throw new NotFoundException(`Review #${id} not found`);
    return review;
  }

  async create(dto: CreateReviewDto, user: User) {
    const existing = await this.repo.findOne({
      where: { customer_id: user.id, pharmacy_id: dto.pharmacy_id },
    });
    if (existing) throw new ConflictException('You have already reviewed this pharmacy');
    const review = this.repo.create({ ...dto, customer_id: user.id });
    return this.repo.save(review);
  }

  async update(id: number, dto: UpdateReviewDto, user: User) {
    const review = await this.repo.findOne({ where: { id } });
    if (!review) throw new NotFoundException(`Review #${id} not found`);
    if (review.customer_id !== user.id && user.role !== UserRole.ADMIN) {
      throw new ForbiddenException('Access denied');
    }
    Object.assign(review, dto);
    return this.repo.save(review);
  }

  async remove(id: number, user: User) {
    const review = await this.repo.findOne({ where: { id } });
    if (!review) throw new NotFoundException(`Review #${id} not found`);
    if (review.customer_id !== user.id && user.role !== UserRole.ADMIN) {
      throw new ForbiddenException('Access denied');
    }
    return this.repo.remove(review);
  }

  async getAverageRating(pharmacyId: number) {
    const result = await this.repo
      .createQueryBuilder('review')
      .select('AVG(review.rating)', 'avg')
      .addSelect('COUNT(*)', 'count')
      .where('review.pharmacy_id = :pharmacyId', { pharmacyId })
      .getRawOne();
    return { average: parseFloat(result.avg) || 0, count: parseInt(result.count) || 0 };
  }
}
