import { Document } from 'mongoose';
import { DroneModel, DroneState } from '../enums';
import { Medication } from './medication.interface';

export interface Drone {
  id?: string;
  serialNumber: string;
  weightModel: DroneModel;
  weightLimit: number;
  batteryCapacity: number;
  state: DroneState;
  medications: (string | Medication)[];
  createdAt?: string;
  updatedAt?: string;
}

export type DroneDocument = Drone & Document;
