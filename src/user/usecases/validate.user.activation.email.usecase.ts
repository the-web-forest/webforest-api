import IUseCase from 'src/domain/interfaces/usecase/IUseCase';
import { Inject, Logger } from '@nestjs/common';
import {
  ActivationRequestRepositoryToken,
  RoleRepositoryToken,
  UserRepositoryToken,
} from '../user.tokens';
import SendUserActivationEmailUseCaseOutput from './dtos/send.user.activation.email.usecase.output';
import { MailServiceToken } from '../../app.tokens';
import UserNotFoundError from '../../core/error/user.not.found.error';
import { ActivationRequest } from '../../domain/entities/activation.request';
import { IActivationRequestRepository } from '../../domain/interfaces/repositories/activation.request.repository.interface';
import IMailService from '../../domain/interfaces/services/mail.service.interface';
import { RolesEnum } from '../../auth/enums/roles';
import { Role } from '../../domain/entities/role';
import { User } from '../../domain/entities/user';
import { IRoleRepository } from '../../domain/interfaces/repositories/role.repository.interface';
import { IUserRepository } from '../../domain/interfaces/repositories/user.repository.interface';
import ValidateUserActivationEmailUseCaseInput from './dtos/validate.user.activation.email.usecase.input';
import ValidateUserActivationEmailUseCaseOutput from './dtos/validate.user.activation.email.usecase.output';
import { IsNull } from 'typeorm';

export default class ValidateUserActivationEmailUseCase
  implements
    IUseCase<
      ValidateUserActivationEmailUseCaseInput,
      ValidateUserActivationEmailUseCaseOutput
    >
{
  private readonly logger = new Logger(ValidateUserActivationEmailUseCase.name);
  constructor(
    @Inject(UserRepositoryToken)
    private readonly userRepository: IUserRepository,

    @Inject(RoleRepositoryToken)
    private readonly roleRepository: IRoleRepository,

    @Inject(ActivationRequestRepositoryToken)
    private readonly activationRequestRepository: IActivationRequestRepository,

    @Inject(MailServiceToken)
    private readonly mailService: IMailService,
  ) {}

  async run(
    input: ValidateUserActivationEmailUseCaseInput,
  ): Promise<ValidateUserActivationEmailUseCaseOutput> {
    this.logger.log('Starting');

    const activationRequest = await this.activationRequestRepository.findOne({
      where: { hash: input.hash, activatedAt: IsNull() },
      relations: ['user', 'user.roles'],
    });

    if (!activationRequest) {
      this.logger.error('This activation request cannot be founded');
      throw new UserNotFoundError();
    }

    if (!(await this.isATempUser(activationRequest.user))) {
      this.logger.error('This user is not in Temp User Role');
      throw new UserNotFoundError();
    }

    await this.activateUser(activationRequest);
    await this.sendWelcomeEmail(activationRequest.user);

    return new SendUserActivationEmailUseCaseOutput({
      email: activationRequest.user.email,
      proccessedAt: new Date(),
    });
  }

  private async activateUser(
    activationRequest: ActivationRequest,
  ): Promise<void> {
    this.logger.log('running activateUser');
    activationRequest.activatedAt = new Date();
    activationRequest.user.roles.pop();
    activationRequest.user.roles.push(await this.getRoleById(RolesEnum.User));
    await activationRequest.save();
    await activationRequest.user.save();
  }

  private async sendWelcomeEmail(user: User): Promise<void> {
    await this.mailService.sendWelcomeEmail(user);
  }

  private async isATempUser(user: User): Promise<boolean> {
    const tempRole = await this.getRoleById(RolesEnum.TempUser);
    const data = !!user.roles.find((role) => role.id === tempRole.id);
    return data;
  }

  private async getRoleById(id: number): Promise<Role> {
    return await this.roleRepository.findOne({ where: { id } });
  }
}
