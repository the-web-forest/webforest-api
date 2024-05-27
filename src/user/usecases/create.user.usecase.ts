import IUseCase from "src/domain/interfaces/usecase/IUseCase";
import CreateUserUseCaseInput from "./dtos/create.user.usecase.input";
import CreateUserUseCaseOutput from "./dtos/create.user.usecase.output";
import { Inject, Logger } from "@nestjs/common";
import { IUserRepository } from "src/domain/interfaces/repositories/user.repository.interface";
import { RoleRepositoryToken, UserRepositoryToken } from "../user.tokens";
import * as argon2 from 'argon2';
import UserAlreadyRegistered from "src/core/error/user.already.registered.error";
import { IRoleRepository } from "src/domain/interfaces/repositories/role.repository.interface";
import { Role } from "src/domain/entities/role";
import { RolesEnum } from "src/auth/enums/roles";
import { User } from "src/domain/entities/user";

export default class CreateUserUseCase implements IUseCase<CreateUserUseCaseInput, CreateUserUseCaseOutput> {
    private readonly logger = new Logger(CreateUserUseCase.name);
    constructor(
        @Inject(UserRepositoryToken)
        private readonly userRepository: IUserRepository,

        @Inject(RoleRepositoryToken)
        private readonly roleRepository: IRoleRepository
    ) { }

    async run(input: CreateUserUseCaseInput): Promise<CreateUserUseCaseOutput> {

        const user = await this.userRepository.findOne({ where: { email: input.email } })

        if (user) {
            throw new UserAlreadyRegistered()
        }

        const newUser = await this.saveUser(input);
        return CreateUserUseCaseOutput.createFromUser(newUser);

    }

    private async saveUser(input: CreateUserUseCaseInput): Promise<User> {
        return await this.userRepository.save({
            ...input,
            password: await this.generatePassword(input.password),
            roles: [await this.getTempUserRole()]
        })
    }

    private async getTempUserRole(): Promise<Role> {
        return await this.roleRepository.findOne({ where: { id: RolesEnum.TempUser } })
    }

    private async generatePassword(password: string): Promise<string> {
        return await argon2.hash(password);
    }
}