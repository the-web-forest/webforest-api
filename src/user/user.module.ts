import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { ActivationRequestRepositoryToken, CreateUserUseCaseToken, RoleRepositoryToken, SendUserActivationEmailUseCaseToken, UserRepositoryToken, ValidateUserActivationEmailUseCaseToken } from './user.tokens';
import CreateUserUseCase from './usecases/create.user.usecase';
import UserRepository from 'src/external/repositories/user.repository';
import { User } from 'src/domain/entities/user';
import { TypeOrmModule } from '@nestjs/typeorm';
import RoleRepository from 'src/external/repositories/role.repository';
import { Role } from 'src/domain/entities/role';
import SendUserActivationEmailUseCase from './usecases/send.user.activation.email.usecase';
import { ActivationRequest } from 'src/domain/entities/activation.request';
import ActivationRequestRepository from 'src/external/repositories/activation.request.repository';
import { MailServiceToken } from 'src/app.tokens';
import MailService from 'src/external/services/mail.service';
import ValidateUserActivationEmailUseCase from './usecases/validate.user.activation.email.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, ActivationRequest])],
  providers: [

    // UseCases

    {
      provide: CreateUserUseCaseToken,
      useClass: CreateUserUseCase
    },
    {
      provide: SendUserActivationEmailUseCaseToken,
      useClass: SendUserActivationEmailUseCase
    },
    {
      provide: ValidateUserActivationEmailUseCaseToken,
      useClass: ValidateUserActivationEmailUseCase
    },

    // Repositories

    {
      provide: UserRepositoryToken,
      useClass: UserRepository
    },
    {
      provide: RoleRepositoryToken,
      useClass: RoleRepository
    },
    {
      provide: ActivationRequestRepositoryToken,
      useClass: ActivationRequestRepository
    },

    // Services

    {
      provide: MailServiceToken,
      useClass: MailService,

    }
  ],
  controllers: [UserController],
})
export class UserModule { }
