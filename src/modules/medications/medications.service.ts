import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMedicationDto, UpdateMedicationDto } from '../../dtos';
import { EntitySchema } from '../../enums';
import { MedicationDocument } from '../../interfaces';

@Injectable()
export class MedicationsService {
  constructor(
    @InjectModel(EntitySchema.MEDICATION)
    private medicationModel: Model<MedicationDocument>,
  ) {}

  async findOne(id: string) {
    return this.medicationModel.findById(id);
  }

  async findMany(ids: string[]) {
    return this.medicationModel.find({ _id: { $in: ids } });
  }

  async findAll() {
    return this.medicationModel.find();
  }

  async create(createMedicationDto: CreateMedicationDto) {
    const newMedication = new this.medicationModel(createMedicationDto);
    return newMedication.save();
  }

  async update(id: string, updateMedicationDto: UpdateMedicationDto) {
    this.medicationModel.findByIdAndUpdate(id, updateMedicationDto);
  }

  async remove(id: string): Promise<any> {
    return this.medicationModel.findByIdAndRemove(id);
  }
}
