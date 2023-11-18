import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DronesModule } from './modules/drones/drones.module';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'dotenv';
import { MedicationsModule } from './modules/medications/medications.module';

config();
@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_URL),
    DronesModule,
    MedicationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
