import { DroneModel, DroneState } from '../enums';
import {
  IsString,
  IsInt,
  IsPositive,
  Min,
  Max,
  Length,
  IsEnum,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDroneDto {
  @ApiProperty({ minLength: 1, maxLength: 100 })
  @IsString()
  @Length(1, 100)
  readonly serialNumber: string;

  @ApiProperty({ enum: Object.values(DroneModel) })
  @IsString()
  @IsEnum(DroneModel)
  readonly weightModel: DroneModel;

  @ApiProperty({ minimum: 0, maximum: 500 })
  @IsInt()
  @IsPositive()
  @Max(500)
  readonly weightLimit: number;

  @ApiProperty({ minimum: 0, maximum: 100 })
  @IsInt()
  @Min(0)
  @Max(100)
  readonly batteryCapacity: number;

  @ApiProperty({ enum: Object.values(DroneState) })
  @IsString()
  @IsEnum(DroneState)
  readonly state: DroneState;
}

export class UpdateDroneDto extends PartialType(CreateDroneDto) {}

export class LoadMedicationDto {
  @ApiProperty()
  medicationIds: string[];
}
