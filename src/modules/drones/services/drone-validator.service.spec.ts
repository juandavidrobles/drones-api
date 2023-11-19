import { Test, TestingModule } from '@nestjs/testing';
import { DroneValidatorService } from './drone-validator.service';
import { droneStub } from '../__mocks__/drone.stub';
import { DroneState, ExceptionValue } from '../../../enums';
import { medicationStubs } from '../../medications/__mocks__/medication.stub';
import { Medication } from '../../../interfaces';

describe('DroneValidatorService', () => {
  let service: DroneValidatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DroneValidatorService],
    }).compile();

    service = module.get<DroneValidatorService>(DroneValidatorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should validate battery level over 25% for load', () => {
    expect(() =>
      service.validateBatteryLevelForLoad({
        ...droneStub,
        batteryCapacity: 30,
      }),
    ).not.toThrow(ExceptionValue.DRONE_BATTERY_TOO_LOW);
    expect(() =>
      service.validateBatteryLevelForLoad({
        ...droneStub,
        batteryCapacity: 10,
      }),
    ).toThrow(ExceptionValue.DRONE_BATTERY_TOO_LOW);
  });

  it('should validate state for load', () => {
    expect(() =>
      service.validateStateForLoad({
        ...droneStub,
        state: DroneState.IDLE,
      }),
    ).not.toThrow(ExceptionValue.DRONE_NOT_LOADABLE);
    const errorStates = [
      DroneState.LOADED,
      DroneState.DELIVERING,
      DroneState.DELIVERED,
      DroneState.RETURNING,
    ];
    for (const state of errorStates) {
      expect(() =>
        service.validateStateForLoad({
          ...droneStub,
          state,
        }),
      ).toThrow(ExceptionValue.DRONE_NOT_LOADABLE);
    }
  });

  it('should validate medication loads', () => {
    expect(() =>
      service.validateMedicationsWeightCanBeLoaded(
        { ...droneStub, weightLimit: 500 },
        medicationStubs
          .slice(0, 2)
          .map<Medication>((item) => ({ ...item, weight: 200 })),
      ),
    ).not.toThrow(ExceptionValue.DRONE_WEIGHT_EXCEEDED);
    expect(() =>
      service.validateMedicationsWeightCanBeLoaded(
        { ...droneStub, weightLimit: 300 },
        medicationStubs
          .slice(0, 2)
          .map<Medication>((item) => ({ ...item, weight: 200 })),
      ),
    ).toThrow(ExceptionValue.DRONE_WEIGHT_EXCEEDED);
  });
});
