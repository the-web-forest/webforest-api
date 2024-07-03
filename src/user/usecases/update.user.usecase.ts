import { Inject, Logger } from '@nestjs/common';
import { UserRepositoryToken } from '../user.tokens';
import * as argon2 from 'argon2';
import { User } from '../../domain/entities/user';
import { IUserRepository } from '../../domain/interfaces/repositories/user.repository.interface';
import IUseCase from '../../domain/interfaces/usecase/IUseCase';
import UpdateUserUseCaseInput from './dtos/update.user.usecase.input';
import UpdateUserUseCaseOutput from './dtos/update.user.usecase.output';
import UserNotFoundError from '../../core/error/user.not.found.error';
import { Not } from 'typeorm';
import NickNameAlreadyRegisteredError from '../../core/error/nickname.already.registered.error';

export default class UpdateUserUseCase
  implements IUseCase<UpdateUserUseCaseInput, UpdateUserUseCaseOutput>
{
  private readonly logger = new Logger(UpdateUserUseCase.name);
  constructor(
    @Inject(UserRepositoryToken)
    private readonly userRepository: IUserRepository,
  ) {}

  async run(input: UpdateUserUseCaseInput): Promise<UpdateUserUseCaseOutput> {
    const user = await this.userRepository.findOne({
      where: { id: input.id, isActive: true, isDeleted: false },
    });

    if (!user) {
      throw new UserNotFoundError();
    }

    const newUser = await this.update(input, user);
    return UpdateUserUseCaseOutput.fromUser(newUser);
  }

  private async update(
    input: UpdateUserUseCaseInput,
    user: User,
  ): Promise<User> {
    Object.assign(user, input);

    if (input.password) {
      this.logger.log('Updating user password');
      user.password = await this.generatePassword(input.password);
    }

    if (input.nickName) {
      this.logger.log('Checking if nickName is already registered');
      const nickNameIsAlreadyRegistered = await this.userRepository.findOne({
        where: { nickName: input.nickName, id: Not(user.id) },
      });

      if (nickNameIsAlreadyRegistered) {
        this.logger.warn(
          `Nickname ${nickNameIsAlreadyRegistered.nickName} is already registered`,
        );
        throw new NickNameAlreadyRegisteredError();
      }

      this.logger.log(`Nickname ${input.nickName} is free to use`);
    }

    user.updatedAt = new Date();

    return await user.save();
  }

  private async generatePassword(password: string): Promise<string> {
    return await argon2.hash(password);
  }
}
