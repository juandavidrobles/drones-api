import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DroneState, EntitySchema } from 'src/enums';
import { Drone } from 'src/interfaces/drone.interface';
import { CreateDroneDto, UpdateDroneDto } from '../../dtos/drone.dto';
import { DroneValidatorService } from './services/drone-validator.service';
import { MedicationsService } from '../medications/medications.service';

@Injectable()
export class DronesService {
  constructor(
    @InjectModel(EntitySchema.DRONE) private droneModel: Model<Drone>,
    private medicationsService: MedicationsService,
    private droneValidatorService: DroneValidatorService,
  ) {}

  async findAll() {
    return this.droneModel.find().populate('medications').exec();
  }

  async findOne(id: string): Promise<Drone> {
    return this.droneModel.findById(id).populate('medications').exec();
  }

  async findMany(ids: string[]): Promise<Drone[]> {
    return this.droneModel
      .find({ _id: { $in: ids } })
      .populate('medications')
      .exec();
  }

  async create(createDto: CreateDroneDto) {
    const newDrone = new this.droneModel(createDto);
    return newDrone.save();
  }

  async update(id: string, updateDroneDto: UpdateDroneDto): Promise<Drone> {
    return this.droneModel
      .findByIdAndUpdate(id, updateDroneDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<any> {
    return this.droneModel.findByIdAndRemove(id).exec();
  }

  async loadMedicationsOntoDrone(droneId: string, medicationIds: string[]) {
    const drone = await this.findOne(droneId);
    if (!drone) throw new NotFoundException('Drone not found');

    this.droneValidatorService.validateBatteryLevelForLoad(drone);
    this.droneValidatorService.validateStatusForLoad(drone);
    const medications = await this.medicationsService.findMany(medicationIds);
    this.droneValidatorService.validateMedicationsWeightCanBeLoaded(
      drone,
      medications,
    );

    drone.state = DroneState.LOADING;
    drone.medications = (drone.medications ?? []).concat(...medicationIds);
    return drone.save();
  }
}
