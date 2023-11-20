import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateDroneDto, LoadMedicationDto, UpdateDroneDto } from '../../dtos';
import { DronesService } from './drones.service';
import { Drone, Medication } from '../../interfaces';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiTags,
  PartialType,
} from '@nestjs/swagger';

@ApiTags('drones')
@Controller('drones')
export class DronesController {
  constructor(private dronesService: DronesService) {}

  @ApiOperation({ summary: 'Get all drones', description: 'Get all drones' })
  @Get()
  findAll(): Promise<Drone[]> {
    return this.dronesService.findAll();
  }

  @ApiOperation({
    summary: 'Get loaded medication on drone',
    description: 'Get loaded medication on drone',
  })
  @Get('/:id/loaded-medication')
  getLoadedMedication(@Param('id') id: string): Promise<Medication[]> {
    return this.dronesService.getLoadedMedication(id);
  }

  @ApiOperation({
    summary: 'Get available drones for loading',
    description: 'Get available drones for loading',
  })
  @Get('/available-for-loading')
  getAvailableForLoading(): Promise<Drone[]> {
    return this.dronesService.getAvailableForLoading();
  }

  @ApiOperation({ summary: 'Get drone by id', description: 'Get drone by id' })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Drone> {
    return this.dronesService.findOne(id);
  }

  @ApiOperation({ summary: 'Create a drone', description: 'Create a drone' })
  @Post()
  async create(@Body() createDroneDto: CreateDroneDto): Promise<Drone> {
    try {
      return await this.dronesService.create(createDroneDto);
    } catch (error) {
      throw new BadRequestException('There was a problem creating the record.');
    }
  }

  @ApiOperation({ summary: 'Update a drone', description: 'Update a drone' })
  @ApiBody({ type: PartialType(CreateDroneDto) })
  @ApiParam({ name: 'id', type: 'string' })
  @Put('/:id')
  update(
    @Param('id') id,
    @Body() updateDroneDto: UpdateDroneDto,
  ): Promise<Drone> {
    return this.dronesService.update(id, updateDroneDto);
  }

  @ApiOperation({
    summary: 'Load medications onto drone',
    description: 'Load medications onto drone',
  })
  @Put('/:id/load')
  loadMedicationOnDrone(
    @Param('id') id: string,
    @Body() { medicationIds }: LoadMedicationDto,
  ) {
    return this.dronesService.loadMedicationsOntoDrone(id, medicationIds);
  }

  @ApiOperation({
    summary: 'Remove medications from drone',
    description: 'Remove medications from drone',
  })
  @Put('/:id/remove-load')
  removeMedicationFromDrone(@Param('id') id: string) {
    return this.dronesService.removeDroneLoad(id);
  }
}
