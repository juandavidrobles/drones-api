import { Module } from '@nestjs/common';
import { DronesController } from './drones.controller';
import { DronesService } from './drones.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DroneModelDefinition, MedicationModelDefinition } from '../../schemas';
import { DroneValidatorService } from './services/drone-validator.service';
import { MedicationsService } from '../medications/medications.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      DroneModelDefinition,
      MedicationModelDefinition,
    ]),
  ],
  controllers: [DronesController],
  providers: [DronesService, DroneValidatorService, MedicationsService],
})
export class DronesModule {}
