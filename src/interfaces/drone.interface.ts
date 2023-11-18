import { Document } from 'mongoose';

export interface Drone extends Document {
  serialNumber: string;
  weightModel: string;
  weightLimit: number;
  batteryCapacity: number;
  state: string;
}
