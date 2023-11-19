import { Test, TestingModule } from '@nestjs/testing';
import { DronesService } from './drones.service';
import { getModelToken } from '@nestjs/mongoose';
import { MockDroneModel } from '../../test-db/mock-drone-model';
import { DroneValidatorService } from './services/drone-validator.service';
import { MedicationsService } from '../medications/medications.service';
import { MockMedicationModel } from '../../test-db/mock-medication-model';
import { droneStub } from './__mocks__/drone.stub';

jest.mock('../medications/medications.service');

describe('DronesService', () => {
  let service: DronesService;
  let droneValidatorService: DroneValidatorService;
  let medicationsService: MedicationsService;
  let droneModel: MockDroneModel;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DronesService,
        {
          provide: getModelToken('Drone'),
          useClass: MockDroneModel,
        },
        {
          provide: getModelToken('Medication'),
          useClass: MockMedicationModel,
        },
        DroneValidatorService,
        MedicationsService,
      ],
    }).compile();

    service = module.get<DronesService>(DronesService);
    droneValidatorService = module.get<DroneValidatorService>(
      DroneValidatorService,
    );
    medicationsService = module.get<MedicationsService>(MedicationsService);
    droneModel = module.get<MockDroneModel>(getModelToken('Drone'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call droneModel.findOne when findOne is called', () => {
    jest.spyOn(droneModel, 'findById');
    service.findOne('');
    expect(droneModel.findById).toHaveBeenCalled();
  });

  it('should call droneModel.find when findAll is called', () => {
    jest.spyOn(droneModel, 'find').mockReturnValue({
      populate: async () => {},
    } as never);
    service.findAll();
    expect(droneModel.find).toHaveBeenCalled();
  });

  it('should call droneModel.find when findMany is called', () => {
    jest.spyOn(droneModel, 'find').mockReturnValue({
      populate: async () => {},
    } as never);
    service.findMany([]);
    expect(droneModel.find).toHaveBeenCalled();
  });

  it('should call droneModel.save when create is called', async () => {
    const module = await Test.createTestingModule({
      providers: [
        DronesService,
        DroneValidatorService,
        MedicationsService,
        {
          provide: getModelToken('Drone'),
          useValue: MockDroneModel,
        },
      ],
    }).compile();

    const service = module.get<DronesService>(DronesService);

    const saveSpy = jest.spyOn(MockDroneModel.prototype, 'save');
    const constructorSpy = jest.spyOn(
      MockDroneModel.prototype,
      'constructorSpy',
    );
    service.create(droneStub);
    expect(saveSpy).toHaveBeenCalled();
    expect(constructorSpy).toHaveBeenCalledWith(droneStub);
  });

  it('should run call validation functions when the drone is loaded and save at the end', async () => {
    const validateBatteryLevelForLoad = jest
      .spyOn(droneValidatorService, 'validateBatteryLevelForLoad')
      .mockReturnValue();
    const validateMedicationsWeightCanBeLoaded = jest
      .spyOn(droneValidatorService, 'validateMedicationsWeightCanBeLoaded')
      .mockReturnValue();
    const validateStateForLoad = jest
      .spyOn(droneValidatorService, 'validateStateForLoad')
      .mockReturnValue();
    jest
      .spyOn(medicationsService, 'findMany')
      .mockReturnValue((() => []) as any);
    jest.spyOn(droneModel, 'save').mockResolvedValue(droneStub);
    jest.spyOn(service, 'findOne').mockResolvedValue({ save: () => {} } as any);

    await service.loadMedicationsOntoDrone('', []);
    expect(validateBatteryLevelForLoad).toHaveBeenCalled();
    expect(validateMedicationsWeightCanBeLoaded).toHaveBeenCalled();
    expect(validateStateForLoad).toHaveBeenCalled();
    expect(droneModel.save).toHaveBeenCalled();
  });
});
