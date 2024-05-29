import { Module } from '@nestjs/common';
import { VolunteerController } from './controller/volunteer.controller';

@Module({
  controllers: [VolunteerController]
})
export class VolunteerModule {}
