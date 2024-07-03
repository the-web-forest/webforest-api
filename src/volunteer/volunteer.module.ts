import { Module } from '@nestjs/common';
import { VolunteerController } from './controller/volunteer.controller';
import {
  CreateVolunteerUseCaseToken,
  DeleteVolunteerByIdUseCaseToken,
  GetVolunteerByIdUseCaseToken,
  ListVolunteersUseCaseToken,
  UpdateVolunteerUseCaseToken,
  VolunteerRepositoryToken,
} from './volunteer.tokens';
import CreateVolunteerUseCase from './usecases/create.volunteer.usecase';
import VolunteerRepository from '../external/repositories/volunteer.repository';
import { Volunteer } from '../domain/entities/volunteer';
import { TypeOrmModule } from '@nestjs/typeorm';
import UpdateVolunteerUseCase from './usecases/update.volunteer.usecase';
import GetVolunteerByIdUseCase from './usecases/get.volunteer.by.id.usecase';
import ListVolunteersUseCase from './usecases/list.volunteers..usecase';
import DeleteVolunteerByIdUseCase from './usecases/delete.volunteer.by.id.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([Volunteer])],
  providers: [
    {
      provide: CreateVolunteerUseCaseToken,
      useClass: CreateVolunteerUseCase,
    },
    {
      provide: UpdateVolunteerUseCaseToken,
      useClass: UpdateVolunteerUseCase,
    },
    {
      provide: VolunteerRepositoryToken,
      useClass: VolunteerRepository,
    },
    {
      provide: GetVolunteerByIdUseCaseToken,
      useClass: GetVolunteerByIdUseCase,
    },
    {
      provide: ListVolunteersUseCaseToken,
      useClass: ListVolunteersUseCase,
    },
    {
      provide: DeleteVolunteerByIdUseCaseToken,
      useClass: DeleteVolunteerByIdUseCase,
    }
  ],
  controllers: [VolunteerController],
})
export class VolunteerModule {}
