import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3000;

  // Global prefix
  app.setGlobalPrefix('api/v1');

  // CORS
  app.enableCors({
    origin: configService.get<string>('CORS_ORIGIN') || '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Global pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  // Global filters
  app.useGlobalFilters(new AllExceptionsFilter());

  // Global interceptors
  app.useGlobalInterceptors(new TransformInterceptor());

  // Swagger
  if (configService.get<string>('NODE_ENV') !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('Saydali API - صيدلي')
      .setDescription('Pharmacy Platform API by Zawan - Complete pharmacy management system')
      .setVersion('1.0')
      .addBearerAuth()
      .addTag('Auth', 'Authentication endpoints')
      .addTag('Users', 'User management')
      .addTag('Governorates', 'Governorate/region management')
      .addTag('Pharmacies', 'Pharmacy management')
      .addTag('Working Hours', 'Pharmacy working hours')
      .addTag('Pharmacy Doctors', 'Pharmacy doctors/consultants')
      .addTag('Categories', 'Product categories')
      .addTag('Products', 'Product catalog')
      .addTag('Pharmacy Products', 'Pharmacy inventory')
      .addTag('Subscription Plans', 'Subscription plans')
      .addTag('Subscriptions', 'Pharmacy subscriptions')
      .addTag('Orders', 'Order management')
      .addTag('Reviews', 'Pharmacy reviews')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document, {
      swaggerOptions: { persistAuthorization: true },
    });

    console.log(`Swagger docs: http://localhost:${port}/api/docs`);
  }

  await app.listen(port);
  console.log(`🚀 Saydali API running on: http://localhost:${port}/api/v1`);
}

bootstrap();
