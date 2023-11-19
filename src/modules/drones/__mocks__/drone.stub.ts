import { Drone } from 'src/interfaces';
import { DroneModel, DroneState } from '../../../enums';

export const droneStub: Drone = {
  serialNumber: '12345',
  weightModel: DroneModel.LIGHTWEIGHT,
  weightLimit: 400,
  batteryCapacity: 65,
  state: DroneState.LOADING,
  medications: [
    {
      name: 'Acetaminophen',
      weight: 100,
      code: '123',
      image:
        'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.amazon.com%2FBasic-Care-Release-Acetaminophen-Caplets%2Fdp%2FB074F2467Z&psig=AOvVaw36UysF3MHonMESKXCNySEr&ust=1700429059142000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCOiXkYK-zoIDFQAAAAAdAAAAABAE',
      createdAt: '2023-11-18T23:45:38.497Z',
      updatedAt: '2023-11-18T23:45:38.497Z',
      id: '655a833bd9d9e146c6f49faf',
    },
  ],
  createdAt: '2023-11-18T23:46:06.440Z',
  updatedAt: '2023-11-18T23:49:03.174Z',
  id: '65594cbe0e07be9ace6c2e0a',
};

export const droneStubs = [
  {
    serialNumber: 'SN001',
    weightModel: 'Lightweight',
    weightLimit: 100,
    batteryCapacity: 80,
    state: 'IDLE',
    medications: [],
    createdAt: '2023-11-19T12:00:00.000Z',
    updatedAt: '2023-11-19T12:00:00.000Z',
    id: '655a83e4eda2f9ce6f178d8c',
  },
  {
    serialNumber: 'SN002',
    weightModel: 'Middleweight',
    weightLimit: 200,
    batteryCapacity: 70,
    state: 'LOADING',
    medications: ['655a833bd9d9e146c6f49fb0'],
    createdAt: '2023-11-19T12:10:00.000Z',
    updatedAt: '2023-11-19T12:10:00.000Z',
    id: '655a83e4eda2f9ce6f178d8d',
  },
  {
    serialNumber: 'SN003',
    weightModel: 'Cruiserweight',
    weightLimit: 300,
    batteryCapacity: 60,
    state: 'LOADED',
    medications: ['655a833bd9d9e146c6f49fb1', '655a833bd9d9e146c6f49fb2'],
    createdAt: '2023-11-19T12:20:00.000Z',
    updatedAt: '2023-11-19T12:20:00.000Z',
    id: '655a83e4eda2f9ce6f178d8e',
  },
  {
    serialNumber: 'SN004',
    weightModel: 'Heavyweight',
    weightLimit: 400,
    batteryCapacity: 50,
    state: 'DELIVERING',
    medications: ['655a833bd9d9e146c6f49fb3', '655a833bd9d9e146c6f49fb2'],
    createdAt: '2023-11-19T12:30:00.000Z',
    updatedAt: '2023-11-19T12:30:00.000Z',
    id: '655a83e4eda2f9ce6f178d8f',
  },
  {
    serialNumber: 'SN005',
    weightModel: 'Heavyweight',
    weightLimit: 500,
    batteryCapacity: 40,
    state: 'DELIVERED',
    medications: [],
    createdAt: '2023-11-19T12:40:00.000Z',
    updatedAt: '2023-11-19T12:40:00.000Z',
    id: '655a83e4eda2f9ce6f178d90',
  },
  {
    serialNumber: 'SN006',
    weightModel: 'Cruiserweight',
    weightLimit: 350,
    batteryCapacity: 55,
    state: 'RETURNING',
    medications: [],
    createdAt: '2023-11-19T12:50:00.000Z',
    updatedAt: '2023-11-19T12:50:00.000Z',
    id: '655a83e4eda2f9ce6f178d91',
  },
  {
    serialNumber: 'SN007',
    weightModel: 'Middleweight',
    weightLimit: 250,
    batteryCapacity: 65,
    state: 'LOADING',
    medications: ['655a833bd9d9e146c6f49fb4', '655a833bd9d9e146c6f49fb5'],
    createdAt: '2023-11-19T13:00:00.000Z',
    updatedAt: '2023-11-19T13:00:00.000Z',
    id: '655a83e4eda2f9ce6f178d92',
  },
  {
    serialNumber: 'SN008',
    weightModel: 'Lightweight',
    weightLimit: 150,
    batteryCapacity: 75,
    state: 'LOADED',
    medications: ['655a833bd9d9e146c6f49fb6'],
    createdAt: '2023-11-19T13:10:00.000Z',
    updatedAt: '2023-11-19T13:10:00.000Z',
    id: '655a83e4eda2f9ce6f178d93',
  },
  {
    serialNumber: 'SN009',
    weightModel: 'Heavyweight',
    weightLimit: 450,
    batteryCapacity: 45,
    state: 'DELIVERING',
    medications: ['655a833bd9d9e146c6f49faf', '655a833bd9d9e146c6f49fb1'],
    createdAt: '2023-11-19T13:20:00.000Z',
    updatedAt: '2023-11-19T13:20:00.000Z',
    id: '655a83e4eda2f9ce6f178d94',
  },
  {
    serialNumber: 'SN010',
    weightModel: 'Cruiserweight',
    weightLimit: 400,
    batteryCapacity: 35,
    state: 'LOADED',
    medications: ['655a833bd9d9e146c6f49fb3', '655a833bd9d9e146c6f49fb4'],
    createdAt: '2023-11-19T13:30:00.000Z',
    updatedAt: '2023-11-19T13:30:00.000Z',
    id: '655a83e4eda2f9ce6f178d95',
  },
];
