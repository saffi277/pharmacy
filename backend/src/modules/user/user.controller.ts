import {
  Controller, Get, Post, Put, Delete, Param, Body,
  ParseIntPipe, UseGuards, Patch,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from './user.entity';

@ApiTags('Users')
@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@ApiBearerAuth()
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users (Admin)' })
  findAll() { return this.service.findAll(); }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID (Admin)' })
  findOne(@Param('id', ParseIntPipe) id: number) { return this.service.findOne(id); }

  @Post()
  @ApiOperation({ summary: 'Create user (Admin)' })
  create(@Body() dto: CreateUserDto) { return this.service.create(dto); }

  @Put(':id')
  @ApiOperation({ summary: 'Update user (Admin)' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateUserDto) {
    return this.service.update(id, dto);
  }

  @Patch(':id/toggle-active')
  @ApiOperation({ summary: 'Toggle user active status (Admin)' })
  toggleActive(@Param('id', ParseIntPipe) id: number) { return this.service.toggleActive(id); }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user (Admin)' })
  remove(@Param('id', ParseIntPipe) id: number) { return this.service.remove(id); }
}
