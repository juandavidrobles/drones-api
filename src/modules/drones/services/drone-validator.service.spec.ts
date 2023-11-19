import { Test, TestingModule } from '@nestjs/testing';
import { DroneValidatorService } from './drone-validator.service';

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
});
