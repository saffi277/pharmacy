import { Controller, Get, Post, Put, Patch, Param, Body, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { User, UserRole } from '../user/user.entity';

@ApiTags('Orders')
@Controller('orders')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class OrderController {
  constructor(private readonly service: OrderService) {}

  @Get()
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Get all orders (Admin)' })
  findAll() { return this.service.findAll(); }

  @Get('my')
  @ApiOperation({ summary: 'Get my orders' })
  findMine(@CurrentUser() user: User) { return this.service.findByCustomer(user.id); }

  @Get('pharmacy/:pharmacyId')
  @ApiOperation({ summary: 'Get orders for a pharmacy' })
  findByPharmacy(@Param('pharmacyId', ParseIntPipe) id: number) {
    return this.service.findByPharmacy(id);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) { return this.service.findOne(id); }

  @Post()
  @ApiOperation({ summary: 'Create new order' })
  create(@Body() dto: CreateOrderDto, @CurrentUser() user: User) {
    return this.service.create(dto, user);
  }

  @Put(':id/status')
  @ApiOperation({ summary: 'Update order status' })
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateOrderDto,
    @CurrentUser() user: User,
  ) {
    return this.service.updateStatus(id, dto, user);
  }

  @Patch(':id/cancel')
  @ApiOperation({ summary: 'Cancel order' })
  cancel(@Param('id', ParseIntPipe) id: number, @CurrentUser() user: User) {
    return this.service.cancel(id, user);
  }
}
