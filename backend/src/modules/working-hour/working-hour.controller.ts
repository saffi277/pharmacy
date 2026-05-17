import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { WorkingHourService } from './working-hour.service';
import { CreateWorkingHourDto } from './dto/create-working-hour.dto';
import { UpdateWorkingHourDto } from './dto/update-working-hour.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@ApiTags('Working Hours')
@Controller('working-hours')
export class WorkingHourController {
  constructor(private readonly service: WorkingHourService) {}

  @Get('pharmacy/:pharmacyId')
  @ApiOperation({ summary: 'Get working hours for a pharmacy' })
  findByPharmacy(@Param('pharmacyId', ParseIntPipe) id: number) {
    return this.service.findByPharmacy(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create working hour' })
  create(@Body() dto: CreateWorkingHourDto) { return this.service.create(dto); }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update working hour' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateWorkingHourDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete working hour' })
  remove(@Param('id', ParseIntPipe) id: number) { return this.service.remove(id); }
}
