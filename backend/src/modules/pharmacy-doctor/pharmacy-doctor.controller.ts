import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { PharmacyDoctorService } from './pharmacy-doctor.service';
import { CreatePharmacyDoctorDto } from './dto/create-pharmacy-doctor.dto';
import { UpdatePharmacyDoctorDto } from './dto/update-pharmacy-doctor.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@ApiTags('Pharmacy Doctors')
@Controller('pharmacy-doctors')
export class PharmacyDoctorController {
  constructor(private readonly service: PharmacyDoctorService) {}

  @Get('pharmacy/:pharmacyId')
  @ApiOperation({ summary: 'Get doctors for a pharmacy' })
  findByPharmacy(@Param('pharmacyId', ParseIntPipe) id: number) {
    return this.service.findByPharmacy(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  create(@Body() dto: CreatePharmacyDoctorDto) { return this.service.create(dto); }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePharmacyDoctorDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  remove(@Param('id', ParseIntPipe) id: number) { return this.service.remove(id); }
}
