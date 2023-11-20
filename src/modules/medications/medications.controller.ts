import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { MedicationsService } from './medications.service';
import { CreateMedicationDto, UpdateMedicationDto } from '../../dtos';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('medications')
@Controller('medications')
export class MedicationsController {
  constructor(private medicationService: MedicationsService) {}

  @ApiOperation({
    summary: 'Get all medications',
    description: 'Get all medications',
  })
  @Get()
  findAll() {
    return this.medicationService.findAll();
  }

  @ApiOperation({
    summary: 'Get medication by id',
    description: 'Get medication by id',
  })
  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.medicationService.findOne(id);
  }

  @ApiOperation({
    summary: 'Create medication',
    description: 'Create medication',
  })
  @Post()
  create(@Body() createMedicationDto: CreateMedicationDto) {
    return this.medicationService.create(createMedicationDto);
  }

  @ApiOperation({
    summary: 'Update medication',
    description: 'Update medication',
  })
  @Put('/:id')
  update(@Param('id') id: string, updateMedicationDto: UpdateMedicationDto) {
    return this.medicationService.update(id, updateMedicationDto);
  }
}
