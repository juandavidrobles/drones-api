import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { MedicationsService } from './medications.service';
import { CreateMedicationDto, UpdateMedicationDto } from '../../dtos';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('medications')
@Controller('medications')
export class MedicationsController {
  constructor(private medicationService: MedicationsService) {}

  @Get()
  findAll() {
    return this.medicationService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.medicationService.findOne(id);
  }

  @Post()
  create(@Body() createMedicationDto: CreateMedicationDto) {
    return this.medicationService.create(createMedicationDto);
  }

  @Put('/:id')
  update(@Param('id') id: string, updateMedicationDto: UpdateMedicationDto) {
    return this.medicationService.update(id, updateMedicationDto);
  }
}
