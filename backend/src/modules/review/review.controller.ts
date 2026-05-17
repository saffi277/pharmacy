import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { User } from '../user/user.entity';

@ApiTags('Reviews')
@Controller('reviews')
export class ReviewController {
  constructor(private readonly service: ReviewService) {}

  @Get('pharmacy/:pharmacyId')
  @ApiOperation({ summary: 'Get reviews for a pharmacy' })
  findByPharmacy(@Param('pharmacyId', ParseIntPipe) id: number) {
    return this.service.findByPharmacy(id);
  }

  @Get('pharmacy/:pharmacyId/rating')
  @ApiOperation({ summary: 'Get average rating for a pharmacy' })
  getRating(@Param('pharmacyId', ParseIntPipe) id: number) {
    return this.service.getAverageRating(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create review' })
  create(@Body() dto: CreateReviewDto, @CurrentUser() user: User) {
    return this.service.create(dto, user);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateReviewDto, @CurrentUser() user: User) {
    return this.service.update(id, dto, user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  remove(@Param('id', ParseIntPipe) id: number, @CurrentUser() user: User) {
    return this.service.remove(id, user);
  }
}
