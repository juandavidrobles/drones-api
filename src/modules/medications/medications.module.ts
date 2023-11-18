import { Module } from '@nestjs/common';
import { MedicationsController } from './medications.controller';
import { MedicationsService } from './medications.service';
import { MedicationModelDefinition } from 'src/schemas';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([MedicationModelDefinition])],
  controllers: [MedicationsController],
  providers: [MedicationsService],
})
export class MedicationsModule {}
