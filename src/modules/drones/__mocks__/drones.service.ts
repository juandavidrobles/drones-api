import { droneStub } from './drone.stub';

export const DronesService = jest.fn().mockReturnValue({
  create: jest.fn().mockReturnValue(droneStub),
  findAll: jest.fn().mockReturnValue([droneStub]),
  findOne: jest.fn().mockReturnValue(droneStub),
  update: jest.fn().mockReturnValue(droneStub),
  remove: jest.fn().mockReturnValue(droneStub),
});
