import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>,
  ) {}

  findAll() {
    return this.repo.find({
      select: ['id', 'name', 'email', 'phone', 'role', 'avatar', 'is_active', 'created_at'],
    });
  }

  async findOne(id: number) {
    const user = await this.repo.findOne({
      where: { id },
      select: ['id', 'name', 'email', 'phone', 'role', 'avatar', 'is_active', 'created_at'],
    });
    if (!user) throw new NotFoundException(`User #${id} not found`);
    return user;
  }

  async findByEmail(email: string) {
    return this.repo.findOne({ where: { email } });
  }

  async create(dto: CreateUserDto) {
    const existing = await this.repo.findOne({ where: { email: dto.email } });
    if (existing) throw new ConflictException('Email already exists');
    const user = this.repo.create(dto);
    const saved = await this.repo.save(user);
    const { password, ...result } = saved;
    return result;
  }

  async update(id: number, dto: UpdateUserDto) {
    const user = await this.repo.findOne({ where: { id } });
    if (!user) throw new NotFoundException(`User #${id} not found`);
    Object.assign(user, dto);
    const saved = await this.repo.save(user);
    const { password, ...result } = saved;
    return result;
  }

  async remove(id: number) {
    const user = await this.repo.findOne({ where: { id } });
    if (!user) throw new NotFoundException(`User #${id} not found`);
    return this.repo.remove(user);
  }

  async toggleActive(id: number) {
    const user = await this.repo.findOne({ where: { id } });
    if (!user) throw new NotFoundException(`User #${id} not found`);
    user.is_active = !user.is_active;
    return this.repo.save(user);
  }
}
