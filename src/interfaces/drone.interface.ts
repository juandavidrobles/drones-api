import { Document } from 'mongoose';
import { DroneModel, DroneState } from 'src/enums';
import { Medication } from './medication.interface';

export interface Drone extends Document {
  serialNumber: string;
  weightModel: DroneModel;
  weightLimit: number;
  batteryCapacity: number;
  state: DroneState;
  medications: (string | Medication)[];
}
