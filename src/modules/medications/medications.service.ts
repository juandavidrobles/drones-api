import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CreateMedicationDto,
  UpdateMedicationDto,
} from 'src/dtos/medication.dto';
import { EntitySchema } from 'src/enums';
import { Medication } from 'src/interfaces/medication.interface';

@Injectable()
export class MedicationsService {
  constructor(
    @InjectModel(EntitySchema.MEDICATION)
    private medicationModel: Model<Medication>,
  ) {}

  async findOne(id: string) {
    return this.medicationModel.findById(id).exec();
  }

  async findMany(ids: string[]) {
    return this.medicationModel.find({ _id: { $in: ids } }).exec();
  }

  async findAll() {
    return this.medicationModel.find().exec();
  }

  async create(createMedicationDto: CreateMedicationDto) {
    const newMedication = new this.medicationModel(createMedicationDto);
    return newMedication.save();
  }

  async update(id: string, updateMedicationDto: UpdateMedicationDto) {
    this.medicationModel.findByIdAndUpdate(id, updateMedicationDto).exec();
  }

  async remove(id: string): Promise<any> {
    return this.medicationModel.findByIdAndRemove(id).exec();
  }
}
