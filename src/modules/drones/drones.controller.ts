import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateDroneDto, UpdateDroneDto } from 'src/dtos/drone.dto';
import { DronesService } from './drones.service';
import { Drone } from 'src/interfaces/drone.interface';

@Controller('drones')
export class DronesController {
  constructor(private dronesService: DronesService) {}

  @Get()
  findAll(): Promise<Drone[]> {
    return this.dronesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Drone> {
    return this.dronesService.findOne(id);
  }

  @Post()
  create(@Body() createDroneDto: CreateDroneDto): Promise<Drone> {
    return this.dronesService.create(createDroneDto);
  }

  @Put('/:id')
  update(
    @Body() updateDroneDto: UpdateDroneDto,
    @Param('id') id,
  ): Promise<Drone> {
    return this.dronesService.update(id, updateDroneDto);
  }
}
