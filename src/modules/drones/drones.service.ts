import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DroneState, EntitySchema } from '../../enums';
import {
  DroneDocument,
  Medication,
  MedicationDocument,
} from '../../interfaces';
import { CreateDroneDto, UpdateDroneDto } from '../../dtos';
import { DroneValidatorService } from './services/drone-validator.service';
import { MedicationsService } from '../medications/medications.service';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class DronesService {
  private readonly logger = new Logger(DronesService.name);

  constructor(
    @InjectModel(EntitySchema.DRONE) private droneModel: Model<DroneDocument>,
    private medicationsService: MedicationsService,
    private droneValidatorService: DroneValidatorService,
  ) {}

  getLoadedMedication(id: string): Promise<Medication[]> {
    return this.findOne(id).then(
      (drone) => drone.medications as MedicationDocument[],
    );
  }

  getAvailableForLoading(): Promise<DroneDocument[]> {
    return this.droneModel
      .find({
        state: { $in: [DroneState.IDLE, DroneState.LOADING] },
      })
      .populate('medications');
  }

  async findAll(): Promise<DroneDocument[]> {
    return this.droneModel.find().populate('medications');
  }

  async findOne(id: string): Promise<DroneDocument> {
    return this.droneModel.findById(id).populate('medications');
  }

  async findMany(ids: string[]): Promise<DroneDocument[]> {
    return this.droneModel.find({ _id: { $in: ids } }).populate('medications');
  }

  async create(createDto: CreateDroneDto) {
    try {
      const newDrone = new this.droneModel(createDto);
      return newDrone.save();
    } catch (error) {
      if (error.code === 1100) {
        throw new ConflictException(
          'A record with this identifier already exists.',
        );
      } else {
        throw new InternalServerErrorException('An unexpected error occurred.');
      }
    }
  }

  async update(
    id: string,
    updateDroneDto: UpdateDroneDto,
  ): Promise<DroneDocument> {
    return this.droneModel.findByIdAndUpdate(id, updateDroneDto, { new: true });
  }

  async remove(id: string): Promise<any> {
    return this.droneModel.findByIdAndRemove(id);
  }

  async loadMedicationsOntoDrone(droneId: string, medicationIds: string[]) {
    const drone = await this.findOne(droneId);
    if (!drone) throw new NotFoundException('Drone not found');

    this.droneValidatorService.validateBatteryLevelForLoad(drone);
    this.droneValidatorService.validateStateForLoad(drone);
    const medications = await this.medicationsService.findMany(medicationIds);
    this.droneValidatorService.validateMedicationsWeightCanBeLoaded(
      drone,
      medications,
    );

    drone.state = DroneState.LOADING;
    drone.medications = (drone.medications ?? []).concat(...medicationIds);
    return drone.save();
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async handleBatteryLevelCheck() {
    const drones = await this.findAll();
    for (const drone of drones) {
      if (drone.batteryCapacity < 25) {
        this.logger.warn(
          `Drone ${drone.id} has low battery: ${drone.batteryCapacity}%`,
        );
        if (drone.state === DroneState.LOADING) {
          drone.state = DroneState.LOADED;
          await drone.save();
          this.logger.warn(`Drone ${drone.id} state updated to LOADED.`);
        }
      }
    }
  }
}
