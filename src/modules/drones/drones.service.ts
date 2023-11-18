import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntitySchema } from 'src/enums';
import { Drone } from 'src/interfaces/drone.interface';
import { CreateDroneDto, UpdateDroneDto } from '../../dtos/drone.dto';

@Injectable()
export class DronesService {
  constructor(
    @InjectModel(EntitySchema.DRONE) private droneModel: Model<Drone>,
  ) {}

  async findAll() {
    return this.droneModel.find().populate('medications').exec();
  }

  async findOne(id: string): Promise<Drone> {
    return this.droneModel.findById(id).populate('medications').exec();
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
}
