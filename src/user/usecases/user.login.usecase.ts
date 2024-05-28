import { Inject, Logger } from "@nestjs/common";
import { UserRepositoryToken } from "../user.tokens";
import * as argon2 from 'argon2';
import { IUserRepository } from "../../domain/interfaces/repositories/user.repository.interface";
import IUseCase from "../../domain/interfaces/usecase/IUseCase";
import UserLoginUseCaseInput from "./dtos/user.login.usecase.input";
import UserLoginUseCaseOutput from "./dtos/user.login.usecase.output";
import UserNotFoundError from "../../core/error/user.not.found.error";
import { JwtService } from "@nestjs/jwt";
import { User } from "../../domain/entities/user";
import { Config } from "../../domain/constants/config.constants";
import { RolesEnum } from "../../auth/enums/roles";
import UserNotActivatedError from "../../core/error/user.not.activated.error";

export default class UserLoginUseCase implements IUseCase<UserLoginUseCaseInput, UserLoginUseCaseOutput> {
    private readonly logger = new Logger(UserLoginUseCase.name);

    constructor(
        @Inject(UserRepositoryToken)
        private readonly userRepository: IUserRepository,
        private readonly jwtService: JwtService,
    ) { }

    async run(input: UserLoginUseCaseInput): Promise<UserLoginUseCaseOutput> {
        this.logger.log(`Attempting to log in user with email: ${input.email}`);

        const user = await this.userRepository.findOne({
            where: { email: input.email, isActive: true, isDeleted: false },
            relations: ['roles'],
        });

        if (!user) {
            this.logger.warn(`User with email ${input.email} not found or not active`);
            throw new UserNotFoundError();
        }

        if (user.roles.some(role => role.id === RolesEnum.TempUser)) {
            this.logger.warn(`User with email ${input.email} has not activated their account`);
            throw new UserNotActivatedError();
        }

        const isPasswordValid = await this.isValidPassword(user.password, input.password);

        if (!isPasswordValid) {
            this.logger.warn(`Invalid password attempt for user with email ${input.email}`);
            throw new UserNotFoundError();
        }

        return this.generateOutput(user);
    }

    private async isValidPassword(hash: string, password: string): Promise<boolean> {
        return argon2.verify(hash, password);
    }

    private async generateOutput(user: User): Promise<UserLoginUseCaseOutput> {
        const token = await this.generateAuthToken(user);
        const expiration = this.calculateTokenExpirationDate();

        this.logger.log(`User with email ${user.email} successfully logged in`);
        return new UserLoginUseCaseOutput({ token, expiration });
    }

    private async generateAuthToken(user: User): Promise<string> {
        const { password, ...userData } = user;
        return this.jwtService.signAsync(userData);
    }

    private calculateTokenExpirationDate(): Date {
        const expirationDate = new Date();
        expirationDate.setHours(expirationDate.getHours() + Config.jwtExpirationTimeInHours);
        return expirationDate;
    }
}