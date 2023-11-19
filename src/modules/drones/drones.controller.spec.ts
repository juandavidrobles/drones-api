import { Test, TestingModule } from '@nestjs/testing';
import { DronesController } from './drones.controller';
import { DronesService } from './drones.service';
import { droneStub } from './__mocks__/drone.stub';

jest.mock('./drones.service');

describe('DronesController', () => {
  let controller: DronesController;
  let service: DronesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DronesController],
      providers: [DronesService],
    }).compile();

    controller = module.get<DronesController>(DronesController);
    service = module.get<DronesService>(DronesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return one drone by calling dronesService.findOne', () => {
    controller.findOne('');
    expect(service.findOne).toHaveBeenCalledWith('');
    expect(service.findOne('')).toEqual(droneStub);
  });

  it('should return all the drones by calling dronesService.findAll', () => {
    controller.findAll();
    expect(service.findAll).toHaveBeenCalledWith();
    expect(service.findAll()).toEqual([droneStub]);
  });

  it('should create a drone by calling dronesService.create', () => {
    controller.create(droneStub);
    expect(service.create).toHaveBeenCalledWith(droneStub);
    expect(service.create(droneStub)).toEqual(droneStub);
  });

  it('should update a drone by calling dronesService.update', () => {
    controller.update('', droneStub);
    expect(service.update).toHaveBeenCalledWith('', droneStub);
    expect(service.update('', droneStub)).toEqual(droneStub);
  });
});
