import { IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGovernorateDto {
  @ApiProperty({ example: 'العاصمة' })
  @IsString()
  @MaxLength(100)
  name_ar: string;

  @ApiProperty({ example: 'Capital' })
  @IsString()
  @MaxLength(100)
  name_en: string;
}
