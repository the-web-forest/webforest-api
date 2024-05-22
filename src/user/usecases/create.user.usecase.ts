import IUseCase from "src/domain/interfaces/usecase/IUseCase";
import CreateUserUseCaseInput from "./dtos/create.user.usecase.input";
import CreateUserUseCaseOutput from "./dtos/create.user.usecase.output";
import { Inject, Logger } from "@nestjs/common";
import { IUserRepository } from "src/domain/interfaces/repositories/user.repository.interface";
import { UserRepositoryToken } from "../user.tokens";
import * as argon2 from 'argon2';

export default class CreateUserUseCase implements IUseCase<CreateUserUseCaseInput, CreateUserUseCaseOutput> {
    private readonly logger = new Logger(CreateUserUseCase.name);
    constructor(
        @Inject(UserRepositoryToken)
        private readonly userRepository: IUserRepository
    ) { }

    async run(input: CreateUserUseCaseInput): Promise<CreateUserUseCaseOutput> {

        const user = await this.userRepository.findOne({ where: { email: input.email } })

        if (user) {
            throw new Error('User Already Exists')
        }

        const newUser = await this.userRepository.save({
            ...input,
            password: await this.generatePassword(input.password)
        })

        return CreateUserUseCaseOutput.createFromUser(newUser)

    }

    private async generatePassword(password: string): Promise<string> {
        return await argon2.hash(password);
    }
}