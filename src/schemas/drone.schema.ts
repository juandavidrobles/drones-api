import * as mongoose from 'mongoose';
import { EntitySchema } from '../enums';
import { ModelDefinition } from '@nestjs/mongoose';
import { DroneModel, DroneState } from '../enums';

export const DroneSchema = new mongoose.Schema(
  {
    serialNumber: {
      type: String,
      maxLength: 100,
      unique: true,
    },
    weightModel: {
      type: String,
      enum: Object.values(DroneModel),
    },
    weightLimit: {
      type: Number,
      min: 0,
      max: 500,
    },
    batteryCapacity: {
      type: Number,
      min: 0,
      max: 100,
    },
    state: {
      type: String,
      enum: Object.values(DroneState),
      default: 'IDLE',
    },
    medications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: EntitySchema.MEDICATION,
      },
    ],
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

export const DroneModelDefinition: ModelDefinition = {
  name: EntitySchema.DRONE,
  schema: DroneSchema,
};
