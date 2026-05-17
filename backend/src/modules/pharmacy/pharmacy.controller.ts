import {
  Controller, Get, Post, Put, Delete, Param, Body,
  ParseIntPipe, UseGuards, Query, Patch,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { PharmacyService } from './pharmacy.service';
import { CreatePharmacyDto } from './dto/create-pharmacy.dto';
import { UpdatePharmacyDto } from './dto/update-pharmacy.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { User, UserRole } from '../user/user.entity';

@ApiTags('Pharmacies')
@Controller('pharmacies')
export class PharmacyController {
  constructor(private readonly service: PharmacyService) {}

  @Get()
  @ApiOperation({ summary: 'Get all active pharmacies' })
  @ApiQuery({ name: 'governorate_id', required: false, type: Number })
  findAll(@Query('governorate_id') governorateId?: number) {
    return this.service.findAll(governorateId);
  }

  @Get('my')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get my pharmacies' })
  findMine(@CurrentUser() user: User) {
    return this.service.findByOwner(user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get pharmacy by ID' })
  findOne(@Param('id', ParseIntPipe) id: number) { return this.service.findOne(id); }

  @Get('slug/:slug')
  @ApiOperation({ summary: 'Get pharmacy by slug' })
  findBySlug(@Param('slug') slug: string) { return this.service.findBySlug(slug); }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.PHARMACY_OWNER, UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create pharmacy' })
  create(@Body() dto: CreatePharmacyDto, @CurrentUser() user: User) {
    return this.service.create(dto, user);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update pharmacy' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePharmacyDto,
    @CurrentUser() user: User,
  ) {
    return this.service.update(id, dto, user);
  }

  @Patch(':id/verify')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Verify pharmacy (Admin)' })
  verify(@Param('id', ParseIntPipe) id: number) { return this.service.verify(id); }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete pharmacy' })
  remove(@Param('id', ParseIntPipe) id: number, @CurrentUser() user: User) {
    return this.service.remove(id, user);
  }
}
