import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { CreateUserUseCaseToken } from './user.tokens';
import CreateUserUseCase from './usecases/create.user.usecase';

@Module({
  providers: [
    {
      provide: CreateUserUseCaseToken,
      useClass: CreateUserUseCase
    }
  ],
  controllers: [UserController],
})
export class UserModule { }
