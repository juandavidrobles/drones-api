import { BadRequestException, Injectable } from '@nestjs/common';
import { DroneState, ExceptionValue } from '../../../enums';
import { Drone, Medication } from '../../../interfaces';

@Injectable()
export class DroneValidatorService {
  validateBatteryLevelForLoad(drone: Drone) {
    if (drone.batteryCapacity < 25) {
      throw new BadRequestException(ExceptionValue.DRONE_BATTERY_TOO_LOW);
    }
  }

  validateStateForLoad(drone: Drone) {
    if (![DroneState.IDLE, DroneState.LOADING].includes(drone.state)) {
      throw new BadRequestException(ExceptionValue.DRONE_NOT_LOADABLE);
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
      throw new BadRequestException(ExceptionValue.DRONE_WEIGHT_EXCEEDED);
    }
  }
}
