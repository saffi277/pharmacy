import {
  IsEmail,
  IsString,
  MinLength,
  IsOptional,
  IsEnum,
  IsPhoneNumber,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserRole } from '../../modules/user/user.entity';

export class RegisterDto {
  @ApiProperty({ example: 'Ahmed Al-Rashidi' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'ahmed@example.com' })
  @IsEmail()
  email: string;

  @ApiPropertyOptional({ example: '+96512345678' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ example: 'password123', minLength: 6 })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiPropertyOptional({ enum: UserRole, default: UserRole.CUSTOMER })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}
