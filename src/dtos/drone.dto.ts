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

export class CreateDroneDto {
  @IsString()
  @Length(1, 100)
  readonly serialNumber: string;

  @IsString()
  @IsEnum(DroneModel)
  readonly weightModel: DroneModel;

  @IsInt()
  @IsPositive()
  @Max(500)
  readonly weightLimit: number;

  @IsInt()
  @Min(0)
  @Max(100)
  readonly batteryCapacity: number;

  @IsString()
  @IsEnum(DroneState)
  readonly state: DroneState;
}

export class UpdateDroneDto extends PartialType(CreateDroneDto) {}
