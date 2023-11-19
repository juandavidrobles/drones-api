import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsString,
  IsUrl,
  Matches,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateMedicationDto {
  @ApiProperty({ minLength: 1, maxLength: 200 })
  @IsString()
  @MinLength(1)
  @MaxLength(200)
  name: string;

  @ApiProperty({ minimum: 0 })
  @IsNumber()
  @Min(0)
  weight: number;

  @ApiProperty()
  @IsString()
  @Matches(/^[A-Z0-9_]*$/)
  code: string;

  @ApiProperty()
  @IsString()
  @IsUrl()
  image: string;
}

export class UpdateMedicationDto extends PartialType(CreateMedicationDto) {}
