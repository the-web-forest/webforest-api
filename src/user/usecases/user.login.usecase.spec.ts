jest.mock('argon2');
import { Test, TestingModule } from "@nestjs/testing";
import { TypeOrmSQLITETestingModule } from "../../test-utils/database/TypeORMSQLITETestingModule";
import { ActivationRequestRepositoryToken, RoleRepositoryToken, SendUserActivationEmailUseCaseToken, UserLoginUseCaseToken, UserRepositoryToken, ValidateUserActivationEmailUseCaseToken } from "../user.tokens";
import UserRepository from "../../external/repositories/user.repository";
import IUseCase from "../../domain/interfaces/usecase/IUseCase";
import RoleRepository from "../../external/repositories/role.repository";
import ActivationRequestRepository from "../../external/repositories/activation.request.repository";
import { MailServiceToken } from "../../app.tokens";
import RoleSeedTestHelper from "../../test-utils/database/role.seed";
import UserSeedTestHelper from "../../test-utils/database/user.seed";
import { IRoleRepository } from "../../domain/interfaces/repositories/role.repository.interface";
import { IUserRepository } from "../../domain/interfaces/repositories/user.repository.interface";
import { RolesEnum } from "../../auth/enums/roles";
import UserLoginUseCaseInput from "./dtos/user.login.usecase.input";
import UserLoginUseCaseOutput from "./dtos/user.login.usecase.output";
import UserLoginUseCase from "./user.login.usecase";
import { JwtTestingModule } from "../../test-utils/database/jwt.test.module";
import { jwtDecode } from "jwt-decode";
import { faker } from "@faker-js/faker";
import * as argon2 from 'argon2';

describe('User Login Use Case', () => {
    let usecase: IUseCase<UserLoginUseCaseInput, UserLoginUseCaseOutput>
    let roleRepository: IRoleRepository
    let userRepository: IUserRepository
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [...TypeOrmSQLITETestingModule(), ...JwtTestingModule()],
            providers: [
                {
                    provide: UserLoginUseCaseToken,
                    useClass: UserLoginUseCase
                },
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
                {
                    provide: MailServiceToken,
                    useValue: {
                        sendWelcomeEmail: jest.fn().mockReturnValue(Promise.resolve(true))
                    }
                }
            ],
        }).compile();
   
        usecase = module.get<IUseCase<UserLoginUseCaseInput, UserLoginUseCaseOutput>>(UserLoginUseCaseToken)
        roleRepository = module.get<RoleRepository>(RoleRepositoryToken)
        userRepository = module.get<UserRepository>(UserRepositoryToken)
        await RoleSeedTestHelper.seed(roleRepository)
        await UserSeedTestHelper.seed(userRepository)
    });

    it('should not login user with temp role', async () => {
        const user = await userRepository.findOne({ where: { id: 1 }, relations: ['roles'] })
        const tempRole = await roleRepository.findOne({ where: { id: RolesEnum.TempUser } })
        user.roles.push(tempRole)
        await user.save()

        const input = new UserLoginUseCaseInput({ email: user.email, password: user.password })

        expect(async () => {
            await usecase.run(input)
        }).rejects.toThrow('{\"message\":\"User Not Activated\",\"code\":\"WF-0003\"}');

    });

    it('should login user with correct password', async () => {
        const user = await userRepository.findOne({ where: { id: 2 }, relations: ['roles'] })
        const role = await roleRepository.findOne({ where: { id: RolesEnum.User } })
        user.roles.push(role)
        await user.save()

        const input = new UserLoginUseCaseInput({ email: user.email, password: user.password })

        jest.spyOn(usecase as any, 'isValidPassword').mockResolvedValue(true)
        const useCaseResponse = await usecase.run(input)

        expect(useCaseResponse).toBeDefined()
        expect(useCaseResponse.token).toBeDefined()
        expect(useCaseResponse.expiration).toBeDefined()
    });

    it('should generate a valid jwt', async () => {
        const user = await userRepository.findOne({ where: { id: 2 }, relations: ['roles'] })
        const role = await roleRepository.findOne({ where: { id: RolesEnum.User } })
        user.roles.push(role)
        await user.save()

        const input = new UserLoginUseCaseInput({ email: user.email, password: user.password })

        jest.spyOn(usecase as any, 'isValidPassword').mockResolvedValue(true)

        const useCaseResponse = await usecase.run(input)
        const token = useCaseResponse.token
        const decodedToken = jwtDecode(token) as any
        expect(decodedToken.id).toBe(user.id)
        expect(decodedToken.firstName).toBe(user.firstName)
        expect(decodedToken.lastName).toBe(user.lastName)
        expect(decodedToken.email).toBe(user.email)
    });

    it('should not login user with incorrect password', async () => {
        const user = await userRepository.findOne({ where: { id: 2 }, relations: ['roles'] })
        const role = await roleRepository.findOne({ where: { id: RolesEnum.User } })
        user.roles.push(role)
        await user.save()

        const input = new UserLoginUseCaseInput({ email: user.email, password: user.password })

        expect(async () => {
            await usecase.run(input)
        }).rejects.toThrow('{\"message\":\"User Not Found\",\"code\":\"WF-0002\"}');
    });


    it('should not login user not registered', async () => {
        const user = await userRepository.findOne({ where: { id: 2 }, relations: ['roles'] })
        const role = await roleRepository.findOne({ where: { id: RolesEnum.User } })
        user.roles.push(role)
        await user.save()

        jest.mock('argon2', () => ({
            verify: () => "testParsedValue"
        }));

        const input = new UserLoginUseCaseInput({ email: faker.internet.email(), password: faker.internet.password() })

        expect(async () => {
            await usecase.run(input)
        }).rejects.toThrow('{\"message\":\"User Not Found\",\"code\":\"WF-0002\"}');
    });

});
