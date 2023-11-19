import mongoose from 'mongoose';
import { medicationStubs } from './src/modules/medications/__mocks__/medication.stub';
import { config } from 'dotenv';
import { DroneSchema } from './src/schemas/drone.schema';
import { MedicationSchema } from './src/schemas/medication.schema';
import { droneStubs } from './src/modules/drones/__mocks__/drone.stub';

const Drone = mongoose.model('Drone', DroneSchema);
const Medication = mongoose.model('Medication', MedicationSchema);

config();

const mapId = (item) => ({
  ...item,
  _id: new mongoose.Types.ObjectId(item.id),
});

const DRONES = droneStubs.map(mapId);
const MEDICATIONS = medicationStubs.map(mapId);

mongoose
  .connect(process.env.DB_URL)
  .then(async () => {
    console.log('MongoDB connected');

    await Medication.deleteMany({});
    await Drone.deleteMany({});

    await Medication.insertMany(MEDICATIONS);
    await Drone.insertMany(DRONES);

    console.log('Mock data inserted');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Database connection error', err);
    process.exit(1);
  });
