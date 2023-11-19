import { BadRequestException, Injectable } from '@nestjs/common';
import { DroneState } from 'src/enums';
import { Drone } from 'src/interfaces/drone.interface';
import { Medication } from 'src/interfaces/medication.interface';

@Injectable()
export class DroneValidatorService {
  validateBatteryLevelForLoad(drone: Drone) {
    if (drone.batteryCapacity < 25) {
      throw new BadRequestException('Drone battery too low for loading');
    }
  }

  validateStatusForLoad(drone: Drone) {
    if (![DroneState.IDLE, DroneState.LOADING].includes(drone.state)) {
      throw new BadRequestException('Drone not in a loadable state');
    }
  }

  validateMedicationsWeightCanBeLoaded(
    drone: Drone,
    medications: Medication[],
  ) {
    const totalMedicationWeight = medications.reduce(
      (sum, med) => sum + med.weight,
      0,
    );
    const currentLoad = (drone.medications as Medication[]).reduce(
      (sum, medication) => sum + medication.weight,
      0,
    );

    if (totalMedicationWeight + currentLoad > drone.weightLimit) {
      throw new BadRequestException(
        'Loading this medication would exceed drone weight limit',
      );
    }
  }
}
