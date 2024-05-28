import IUseCase from "src/domain/interfaces/usecase/IUseCase";
import { Inject, Logger } from "@nestjs/common";
import { ActivationRequestRepositoryToken, RoleRepositoryToken, UserRepositoryToken } from "../user.tokens";
import { v4 as uuidv4 } from 'uuid';
import SendUserActivationEmailUseCaseOutput from "./dtos/send.user.activation.email.usecase.output";
import SendUserActivationEmailUseCaseInput from "./dtos/send.user.activation.email.usecase.input";
import { MailServiceToken } from "../../app.tokens";
import UserNotFoundError from "../../core/error/user.not.found.error";
import { ActivationRequest } from "../../domain/entities/activation.request";
import { IActivationRequestRepository } from "../../domain/interfaces/repositories/activation.request.repository.interface";
import IMailService from "../../domain/interfaces/services/mail.service.interface";
import { RolesEnum } from "../../auth/enums/roles";
import { Role } from "../../domain/entities/role";
import { User } from "../../domain/entities/user";
import { IRoleRepository } from "../../domain/interfaces/repositories/role.repository.interface";
import { IUserRepository } from "../../domain/interfaces/repositories/user.repository.interface";


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
        const user = await this.userRepository.findOne({ where: { email: input.email, isActive: true, isDeleted: false }, relations: ['roles'] })

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
            createdAt: new Date(),
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