import { Document } from 'mongoose';

export interface Medication extends Document {
  name: string;
  weight: number;
  code: string;
  image: string;
}
