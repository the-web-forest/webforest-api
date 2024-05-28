import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmSQLITETestingModule } from '../../test-utils/database/TypeORMSQLITETestingModule';
import {
  ActivationRequestRepositoryToken,
  RoleRepositoryToken,
  SendUserActivationEmailUseCaseToken,
  UserRepositoryToken,
} from '../user.tokens';
import UserRepository from '../../external/repositories/user.repository';
import IUseCase from '../../domain/interfaces/usecase/IUseCase';
import RoleRepository from '../../external/repositories/role.repository';
import SendUserActivationEmailUseCase from './send.user.activation.email.usecase';
import SendUserActivationEmailUseCaseInput from './dtos/send.user.activation.email.usecase.input';
import SendUserActivationEmailUseCaseOutput from './dtos/send.user.activation.email.usecase.output';
import ActivationRequestRepository from '../../external/repositories/activation.request.repository';
import { MailServiceToken } from '../../app.tokens';
import RoleSeedTestHelper from '../../test-utils/database/role.seed';
import UserSeedTestHelper from '../../test-utils/database/user.seed';
import { IRoleRepository } from '../../domain/interfaces/repositories/role.repository.interface';
import { IUserRepository } from '../../domain/interfaces/repositories/user.repository.interface';
import { RolesEnum } from '../../auth/enums/roles';
import { IActivationRequestRepository } from '../../domain/interfaces/repositories/activation.request.repository.interface';
import { IsNull, Not } from 'typeorm';

describe('Send User Activation Email Use Case', () => {
  let usecase: IUseCase<
    SendUserActivationEmailUseCaseInput,
    SendUserActivationEmailUseCaseOutput
  >;
  let roleRepository: IRoleRepository;
  let userRepository: IUserRepository;
  let activationRequestRepository: IActivationRequestRepository;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmSQLITETestingModule()],
      providers: [
        {
          provide: SendUserActivationEmailUseCaseToken,
          useClass: SendUserActivationEmailUseCase,
        },
        {
          provide: UserRepositoryToken,
          useClass: UserRepository,
        },
        {
          provide: RoleRepositoryToken,
          useClass: RoleRepository,
        },
        {
          provide: ActivationRequestRepositoryToken,
          useClass: ActivationRequestRepository,
        },
        {
          provide: MailServiceToken,
          useValue: {
            sendUserActivationEmail: jest
              .fn()
              .mockReturnValue(Promise.resolve(true)),
          },
        },
      ],
    }).compile();
    usecase = module.get<
      IUseCase<
        SendUserActivationEmailUseCaseInput,
        SendUserActivationEmailUseCaseOutput
      >
    >(SendUserActivationEmailUseCaseToken);
    roleRepository = module.get<RoleRepository>(RoleRepositoryToken);
    userRepository = module.get<UserRepository>(UserRepositoryToken);
    activationRequestRepository = module.get<ActivationRequestRepository>(
      ActivationRequestRepositoryToken,
    );
    await RoleSeedTestHelper.seed(roleRepository);
    await UserSeedTestHelper.seed(userRepository);
  });

  it('should not find an non registered user', async () => {
    const input = new SendUserActivationEmailUseCaseInput({
      email: 'naovai@achar.com',
    });

    expect(async () => {
      await usecase.run(input);
    }).rejects.toThrow('{"message":"User Not Found","code":"WF-0002"}');
  });

  it('should find an registered user with the correct role', async () => {
    const testMail = (await userRepository.findOne({ where: {} })).email;
    const user = await userRepository.findOne({ where: { email: testMail } });
    const tempUserRole = await roleRepository.findOne({
      where: { id: RolesEnum.TempUser },
    });
    user.roles = [tempUserRole];
    await userRepository.save(user);

    const input = new SendUserActivationEmailUseCaseInput({ email: testMail });
    const response = await usecase.run(input);
    expect(response).toBeDefined();
    expect(response.email).toBe(testMail);
  });

  it('should not find an registered user with the incorrect role', async () => {
    const testMail = (await userRepository.findOne({ where: {} })).email;
    const user = await userRepository.findOne({ where: { email: testMail } });
    const tempUserRole = await roleRepository.findOne({
      where: { id: RolesEnum.User },
    });
    user.roles = [tempUserRole];
    await userRepository.save(user);

    const input = new SendUserActivationEmailUseCaseInput({ email: testMail });

    expect(async () => {
      await usecase.run(input);
    }).rejects.toThrow('{"message":"User Not Found","code":"WF-0002"}');
  });

  it('should create an send user activation email register', async () => {
    const testMail = (await userRepository.findOne({ where: {} })).email;
    const user = await userRepository.findOne({ where: { email: testMail } });
    const tempUserRole = await roleRepository.findOne({
      where: { id: RolesEnum.TempUser },
    });
    user.roles = [tempUserRole];
    await userRepository.save(user);

    const input = new SendUserActivationEmailUseCaseInput({ email: testMail });
    await usecase.run(input);
    const activationRequest = await activationRequestRepository.findOne({
      where: { user },
      relations: ['user'],
    });
    expect(activationRequest).toBeDefined();
    expect(activationRequest.user.id).toBe(user.id);
    expect(activationRequest.hash).toBeDefined();
    expect(activationRequest.activatedAt).toBeNull();
    expect(activationRequest.createdAt).toBeDefined();
    expect(activationRequest.createdAt).toBeInstanceOf(Date);
  });
});
