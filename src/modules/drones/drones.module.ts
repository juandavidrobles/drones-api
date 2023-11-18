import { Module } from '@nestjs/common';
import { DronesController } from './drones.controller';
import { DronesService } from './drones.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DroneModelDefinition } from '../../schemas';

@Module({
  imports: [MongooseModule.forFeature([DroneModelDefinition])],
  controllers: [DronesController],
  providers: [DronesService],
})
export class DronesModule {}
