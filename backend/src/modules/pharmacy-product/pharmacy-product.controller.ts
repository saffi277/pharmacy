import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { PharmacyProductService } from './pharmacy-product.service';
import { CreatePharmacyProductDto } from './dto/create-pharmacy-product.dto';
import { UpdatePharmacyProductDto } from './dto/update-pharmacy-product.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@ApiTags('Pharmacy Products')
@Controller('pharmacy-products')
export class PharmacyProductController {
  constructor(private readonly service: PharmacyProductService) {}

  @Get('pharmacy/:pharmacyId')
  @ApiOperation({ summary: 'Get products of a pharmacy' })
  findByPharmacy(@Param('pharmacyId', ParseIntPipe) id: number) {
    return this.service.findByPharmacy(id);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) { return this.service.findOne(id); }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  create(@Body() dto: CreatePharmacyProductDto) { return this.service.create(dto); }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePharmacyProductDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  remove(@Param('id', ParseIntPipe) id: number) { return this.service.remove(id); }
}
