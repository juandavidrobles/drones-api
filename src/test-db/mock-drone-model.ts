import { Drone } from '../interfaces';
import { MockModel } from './mock-model';
import { droneStub } from '../modules/drones/__mocks__/drone.stub';

export class MockDroneModel extends MockModel<Drone> {
  protected entityStub: Drone & Record<string, any> = {
    ...droneStub,
    populate: () => ({ exec: () => {} }),
  };
}
