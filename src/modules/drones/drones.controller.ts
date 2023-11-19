import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateDroneDto, UpdateDroneDto } from '../../dtos';
import { DronesService } from './drones.service';
import { Drone, Medication } from '../../interfaces';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('drones')
@Controller('drones')
export class DronesController {
  constructor(private dronesService: DronesService) {}

  @Get()
  findAll(): Promise<Drone[]> {
    return this.dronesService.findAll();
  }

  @Get('/:id/loaded-medication')
  getLoadedMedication(@Param('id') id: string): Promise<Medication[]> {
    return this.dronesService.getLoadedMedication(id);
  }

  @Get('/available-for-loading')
  getAvailableForLoading(): Promise<Drone[]> {
    return this.dronesService.getAvailableForLoading();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Drone> {
    return this.dronesService.findOne(id);
  }

  @Post()
  async create(@Body() createDroneDto: CreateDroneDto): Promise<Drone> {
    try {
      return await this.dronesService.create(createDroneDto);
    } catch (error) {
      throw new BadRequestException('There was a problem creating the record.');
    }
  }

  @Put('/:id')
  update(
    @Param('id') id,
    @Body() updateDroneDto: UpdateDroneDto,
  ): Promise<Drone> {
    return this.dronesService.update(id, updateDroneDto);
  }

  @Post('/:id/load')
  loadMedicationOnDrone(
    @Param('id') id: string,
    @Body() { medicationIds }: { medicationIds: string[] },
  ) {
    return this.dronesService.loadMedicationsOntoDrone(id, medicationIds);
  }
}
