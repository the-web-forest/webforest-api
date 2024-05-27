import IUseCase from "src/domain/interfaces/usecase/IUseCase";
import CreateUserUseCaseInput from "./dtos/create.user.usecase.input";
import CreateUserUseCaseOutput from "./dtos/create.user.usecase.output";
import { Inject, Logger } from "@nestjs/common";
import { IUserRepository } from "src/domain/interfaces/repositories/user.repository.interface";
import { ActivationRequestRepositoryToken, RoleRepositoryToken, UserRepositoryToken } from "../user.tokens";
import { v4 as uuidv4 } from 'uuid';
import { IRoleRepository } from "src/domain/interfaces/repositories/role.repository.interface";
import { Role } from "src/domain/entities/role";
import { RolesEnum } from "src/auth/enums/roles";
import { User } from "src/domain/entities/user";
import SendUserActivationEmailUseCaseOutput from "./dtos/send.user.activation.email.usecase.output";
import SendUserActivationEmailUseCaseInput from "./dtos/send.user.activation.email.usecase.input";
import UserNotFoundError from "src/core/error/user.not.found.error";
import { IActivationRequestRepository } from "src/domain/interfaces/repositories/activation.request.repository.interface";
import { ActivationRequest } from "src/domain/entities/activation.request";
import { MailServiceToken } from "src/app.tokens";
import IMailService from "src/domain/interfaces/services/mail.service.interface";

export default class SendUserActivationEmailUseCase implements IUseCase<SendUserActivationEmailUseCaseInput, SendUserActivationEmailUseCaseOutput> {
    private readonly logger = new Logger(SendUserActivationEmailUseCase.name);
    constructor(
        @Inject(UserRepositoryToken)
        private readonly userRepository: IUserRepository,

        @Inject(RoleRepositoryToken)
        private readonly roleRepository: IRoleRepository,

        @Inject(ActivationRequestRepositoryToken)
        private readonly activationRequestRepository: IActivationRequestRepository,

        @Inject(MailServiceToken)
        private readonly mailService: IMailService
    ) { }

    async run(input: SendUserActivationEmailUseCaseInput): Promise<SendUserActivationEmailUseCaseOutput> {
        this.logger.log('Starting SendUserActivationEmailUseCase')
        const user = await this.userRepository.findOne({ where: { email: input.email }, relations: ['roles'] })

        if (!user) {
            throw new UserNotFoundError()
        }

        if (!await this.isATempUser(user)) {
            throw new UserNotFoundError()
        }

        const activationRequest = await this.createActivationRequestRegister(user)
        await this.sendActivationRequestEmail(activationRequest)
        return new SendUserActivationEmailUseCaseOutput({
            ...input,
            proccessedAt: new Date()
        });

    }

    private async createActivationRequestRegister(user: User): Promise<ActivationRequest> {
        return await this.activationRequestRepository.save({
            user,
            hash: `${uuidv4()}-${uuidv4()}-${uuidv4()}`,
            createdAt: new Date()
        })
    }

    private async sendActivationRequestEmail(activationRequest: ActivationRequest): Promise<void> {
        await this.mailService.sendUserActivationEmail(activationRequest)
    }

    private async isATempUser(user: User): Promise<boolean> {
        const tempRole = await this.getTempUserRole()
        return !!user.roles.find(role => role.id === tempRole.id)
    }

    private async getTempUserRole(): Promise<Role> {
        return await this.roleRepository.findOne({ where: { id: RolesEnum.TempUser } })
    }

}