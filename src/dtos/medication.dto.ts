import { PartialType } from '@nestjs/mapped-types';
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
  @IsString()
  @MinLength(1)
  @MaxLength(200)
  name: string;

  @IsNumber()
  @Min(0)
  weight: number;

  @IsString()
  @Matches(/^[A-Z0-9_]*$/)
  code: string;

  @IsString()
  @IsUrl()
  image: string;
}

export class UpdateMedicationDto extends PartialType(CreateMedicationDto) {}
