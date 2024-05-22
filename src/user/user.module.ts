import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { CreateUserUseCaseToken, UserRepositoryToken } from './user.tokens';
import CreateUserUseCase from './usecases/create.user.usecase';
import UserRepository from 'src/external/user.repository';
import { User } from 'src/domain/entities/user';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    {
      provide: CreateUserUseCaseToken,
      useClass: CreateUserUseCase
    },
    {
      provide: UserRepositoryToken,
      useClass: UserRepository
    }
  ],
  controllers: [UserController],
})
export class UserModule { }
