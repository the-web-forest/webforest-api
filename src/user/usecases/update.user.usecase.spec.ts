import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmSQLITETestingModule } from '../../test-utils/database/TypeORMSQLITETestingModule';
import {
  UpdateUserUseCaseToken,
  UserRepositoryToken,
} from '../user.tokens';
import UserRepository from '../../external/repositories/user.repository';
import IUseCase from '../../domain/interfaces/usecase/IUseCase';
import { faker } from '@faker-js/faker/locale/af_ZA';
import UpdateUserUseCaseInput from './dtos/update.user.usecase.input';
import UpdateUserUseCaseOutput from './dtos/update.user.usecase.output';
import UpdateUserUseCase from './update.user.usecase';
import { IUserRepository } from '../../domain/interfaces/repositories/user.repository.interface';
import UserSeedTestHelper from '../../test-utils/database/user.seed';

describe('Update User Use Case', () => {
  let usecase: IUseCase<UpdateUserUseCaseInput, UpdateUserUseCaseOutput>;
  let userRepository: IUserRepository;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmSQLITETestingModule()],
      providers: [
        {
          provide: UpdateUserUseCaseToken,
          useClass: UpdateUserUseCase,
        },
        {
          provide: UserRepositoryToken,
          useClass: UserRepository,
        }
      ],
    }).compile();
    usecase = module.get<
      IUseCase<UpdateUserUseCaseInput, UpdateUserUseCaseOutput>
    >(UpdateUserUseCaseToken);
    userRepository = module.get<IUserRepository>(UserRepositoryToken);
    await UserSeedTestHelper.seed(userRepository)
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should update an user', async () => {
    const user = await userRepository.findOne({ where: { id: 1 } })
    user.nickName = faker.internet.userName()
    const input = new UpdateUserUseCaseInput({...user});
    const response = await usecase.run(input);
    expect(response.firstName).toBe(user.firstName);
    expect(response.lastName).toBe(user.lastName);
    expect(response.nickName).toBe(user.nickName);
  });

  it('should not update an non existent user', async () => {
    const user = await userRepository.findOne({ where: { id: 1 } })
    user.id = faker.number.int() + faker.number.int()
    const input = new UpdateUserUseCaseInput({...user});
    await expect(async () => {
      await usecase.run(input);
    }).rejects.toThrow('{"message":"User Not Found","code":"WF-0002"}');
  });


  it('should not update if nickname already in use', async () => {
    const user = await userRepository.findOne({ where: { id: 1 } })
    const userTwo = await userRepository.findOne({ where: { id: 2  } })
    user.nickName = userTwo.nickName
    const input = new UpdateUserUseCaseInput({...user});

    await expect(async () => {
      await usecase.run(input);
    }).rejects.toThrow('{"message":"NickName Already Registered","code":"WF-0004"}');
  });

  it('should not update if nickname is empty', async () => {
    const user = await userRepository.findOne({ where: { id: 1 } })
    const oldNickName = user.nickName
    delete user.nickName
    const input = new UpdateUserUseCaseInput({...user});
    const userCaseResponse = await usecase.run(input);
    expect(userCaseResponse.nickName).toBe(oldNickName)
  });

});
