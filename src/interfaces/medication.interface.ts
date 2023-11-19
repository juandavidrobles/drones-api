import { Document } from 'mongoose';

export interface Medication {
  id?: string;
  name: string;
  weight: number;
  code: string;
  image: string;
  createdAt?: string;
  updatedAt?: string;
}

export type MedicationDocument = Medication & Document;
