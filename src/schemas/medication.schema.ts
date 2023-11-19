import { ModelDefinition } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { EntitySchema } from '../enums/EntitySchema';

export const MedicationSchema = new mongoose.Schema(
  {
    name: { type: String, maxLength: 200, minLength: 1 },
    weight: { type: Number, min: 0 },
    code: { type: String, match: /^[A-Z0-9_]*$/, unique: true },
    image: { type: String, match: /^https?:\/\/.*\.*/ },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  },
);

export const MedicationModelDefinition: ModelDefinition = {
  name: EntitySchema.MEDICATION,
  schema: MedicationSchema,
};
