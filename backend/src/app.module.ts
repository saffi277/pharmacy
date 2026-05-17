import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';
import databaseConfig from './config/database.config';
import jwtConfig from './config/jwt.config';
import redisConfig from './config/redis.config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { GovernorateModule } from './modules/governorate/governorate.module';
import { PharmacyModule } from './modules/pharmacy/pharmacy.module';
import { WorkingHourModule } from './modules/working-hour/working-hour.module';
import { PharmacyDoctorModule } from './modules/pharmacy-doctor/pharmacy-doctor.module';
import { CategoryModule } from './modules/category/category.module';
import { ProductModule } from './modules/product/product.module';
import { PharmacyProductModule } from './modules/pharmacy-product/pharmacy-product.module';
import { SubscriptionPlanModule } from './modules/subscription-plan/subscription-plan.module';
import { SubscriptionModule } from './modules/subscription/subscription.module';
import { OrderModule } from './modules/order/order.module';
import { OrderItemModule } from './modules/order-item/order-item.module';
import { ReviewModule } from './modules/review/review.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, jwtConfig, redisConfig],
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.database'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: configService.get<boolean>('database.synchronize'),
        logging: configService.get<boolean>('database.logging'),
        ssl: configService.get('database.ssl'),
      }),
      inject: [ConfigService],
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 100,
      },
    ]),
    AuthModule,
    UserModule,
    GovernorateModule,
    PharmacyModule,
    WorkingHourModule,
    PharmacyDoctorModule,
    CategoryModule,
    ProductModule,
    PharmacyProductModule,
    SubscriptionPlanModule,
    SubscriptionModule,
    OrderModule,
    OrderItemModule,
    ReviewModule,
  ],
})
export class AppModule {}
