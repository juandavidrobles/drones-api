import { medicationStubs } from './medication.stub';

export const MedicationsService = jest.fn().mockReturnValue({
  create: jest.fn().mockReturnValue(medicationStubs[0]),
  findAll: jest.fn().mockReturnValue([medicationStubs]),
  findMany: jest.fn().mockReturnValue([medicationStubs]),
  findOne: jest.fn().mockReturnValue(medicationStubs[0]),
  update: jest.fn().mockReturnValue(medicationStubs[0]),
  remove: jest.fn().mockReturnValue(medicationStubs[0]),
});
