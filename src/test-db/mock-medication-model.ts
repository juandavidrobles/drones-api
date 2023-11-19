import { MockModel } from './mock-model';
import { Medication } from '../interfaces';
import { medicationStubs } from '../modules/medications/__mocks__/medication.stub';

export class MockMedicationModel extends MockModel<Medication> {
  protected entityStub: Medication = medicationStubs[0];
}
