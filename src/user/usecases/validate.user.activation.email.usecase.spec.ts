import { Test, TestingModule } from "@nestjs/testing";
import { TypeOrmSQLITETestingModule } from "../../test-utils/database/TypeORMSQLITETestingModule";
import { ActivationRequestRepositoryToken, RoleRepositoryToken, SendUserActivationEmailUseCaseToken, UserRepositoryToken, ValidateUserActivationEmailUseCaseToken } from "../user.tokens";
import UserRepository from "../../external/repositories/user.repository";
import IUseCase from "../../domain/interfaces/usecase/IUseCase";
import RoleRepository from "../../external/repositories/role.repository";
import SendUserActivationEmailUseCaseInput from "./dtos/send.user.activation.email.usecase.input";
import SendUserActivationEmailUseCaseOutput from "./dtos/send.user.activation.email.usecase.output";
import ActivationRequestRepository from "../../external/repositories/activation.request.repository";
import { MailServiceToken } from "../../app.tokens";
import RoleSeedTestHelper from "../../test-utils/database/role.seed";
import UserSeedTestHelper from "../../test-utils/database/user.seed";
import { IRoleRepository } from "../../domain/interfaces/repositories/role.repository.interface";
import { IUserRepository } from "../../domain/interfaces/repositories/user.repository.interface";
import { RolesEnum } from "../../auth/enums/roles";
import { IActivationRequestRepository } from "../../domain/interfaces/repositories/activation.request.repository.interface";
import ValidateUserActivationEmailUseCaseInput from "./dtos/validate.user.activation.email.usecase.input";
import ValidateUserActivationEmailUseCaseOutput from "./dtos/validate.user.activation.email.usecase.output";
import ValidateUserActivationEmailUseCase from "./validate.user.activation.email.usecase";
import { Role } from "../../domain/entities/role";

describe('Validate User Activation Email Use Case', () => {
    let usecase: IUseCase<ValidateUserActivationEmailUseCaseInput, ValidateUserActivationEmailUseCaseOutput>
    let roleRepository: IRoleRepository
    let userRepository: IUserRepository
    let activationRequestRepository: IActivationRequestRepository
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [...TypeOrmSQLITETestingModule()],
            providers: [
                {
                    provide: ValidateUserActivationEmailUseCaseToken,
                    useClass: ValidateUserActivationEmailUseCase
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
        usecase = module.get<IUseCase<ValidateUserActivationEmailUseCaseInput, ValidateUserActivationEmailUseCaseOutput>>(ValidateUserActivationEmailUseCaseToken)
        roleRepository = module.get<RoleRepository>(RoleRepositoryToken)
        userRepository = module.get<UserRepository>(UserRepositoryToken)
        activationRequestRepository = module.get<ActivationRequestRepository>(ActivationRequestRepositoryToken)
        await RoleSeedTestHelper.seed(roleRepository)
        await UserSeedTestHelper.seed(userRepository)
    });

    it('should update user role on happy path', async () => {
        const user = await userRepository.findOne({ where: { id: 1 }, relations: ['roles'] })
        const tempRole = await roleRepository.findOne({ where: { id: RolesEnum.TempUser } })
        user.roles.push(tempRole)
        await user.save()
        const hash = 'hash#teste'
        await activationRequestRepository.insert({
            user,
            hash,
            createdAt: new Date()
        })
        const input = new ValidateUserActivationEmailUseCaseInput({ hash: 'hash#teste' })

        const response = await usecase.run(input)

        const updatedUser = await userRepository.findOne({ where: { id: 1 }, relations: ['roles'] })
        const activationRequest = await activationRequestRepository.findOne({ where: { hash } })

        expect(response).toBeDefined()
        expect(response.email).toBe(user.email)
        expect(updatedUser.roles.length).toBe(1)
        expect(updatedUser.roles.find(x => x.id === RolesEnum.User)).toBeDefined()
        expect(updatedUser.roles.find(x => x.id === RolesEnum.User)).toBeInstanceOf(Role)
        expect(activationRequest.activatedAt).toBeDefined()
        expect(activationRequest.activatedAt).toBeInstanceOf(Date)
    });

    it('should throw when user role is not temp user', async () => {
        const user = await userRepository.findOne({ where: { id: 1 }, relations: ['roles'] })
        const tempRole = await roleRepository.findOne({ where: { id: RolesEnum.User } })
        user.roles.push(tempRole)
        await user.save()
        const hash = 'hash#teste'
        await activationRequestRepository.insert({
            user,
            hash,
            createdAt: new Date()
        })
        const input = new ValidateUserActivationEmailUseCaseInput({ hash: 'hash#teste' })

        expect(async () => {
            await usecase.run(input)
        }).rejects.toThrow('{\"message\":\"User Not Found\",\"code\":\"WF-0002\"}');

    });

    it('should throw when activation request is already activated', async () => {
        const user = await userRepository.findOne({ where: { id: 1 }, relations: ['roles'] })
        const tempRole = await roleRepository.findOne({ where: { id: RolesEnum.TempUser } })
        user.roles.push(tempRole)
        await user.save()
        const hash = 'hash#teste'
        await activationRequestRepository.insert({
            user,
            hash,
            createdAt: new Date()
        })
        const input = new ValidateUserActivationEmailUseCaseInput({ hash: 'hash#teste' })
        
        await usecase.run(input)
        
        expect(async () => {
            await usecase.run(input)
        }).rejects.toThrow('{\"message\":\"User Not Found\",\"code\":\"WF-0002\"}');

    });


});
