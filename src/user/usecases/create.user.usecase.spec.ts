import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmSQLITETestingModule } from '../../test-utils/database/TypeORMSQLITETestingModule';
import {
  CreateUserUseCaseToken,
  RoleRepositoryToken,
  UserRepositoryToken,
} from '../user.tokens';
import UserRepository from '../../external/repositories/user.repository';
import CreateUserUseCaseInput from './dtos/create.user.usecase.input';
import CreateUserUseCaseOutput from './dtos/create.user.usecase.output';
import IUseCase from '../../domain/interfaces/usecase/IUseCase';
import CreateUserUseCase from './create.user.usecase';
import RoleRepository from '../../external/repositories/role.repository';
import { faker } from '@faker-js/faker/locale/af_ZA';

describe('Create User Use Case', () => {
  let usecase: IUseCase<CreateUserUseCaseInput, CreateUserUseCaseOutput>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmSQLITETestingModule()],
      providers: [
        {
          provide: CreateUserUseCaseToken,
          useClass: CreateUserUseCase,
        },
        {
          provide: UserRepositoryToken,
          useClass: UserRepository,
        },
        {
          provide: RoleRepositoryToken,
          useClass: RoleRepository,
        },
      ],
    }).compile();
    usecase = module.get<
      IUseCase<CreateUserUseCaseInput, CreateUserUseCaseOutput>
    >(CreateUserUseCaseToken);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create an user', async () => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const user1 = {
      firstName: firstName,
      lastName: lastName,
      nickName: faker.internet.userName({ firstName, lastName }),
      email: faker.internet.email({ firstName, lastName }),
      password: faker.internet.password(),
    };
    const input = new CreateUserUseCaseInput(user1);
    const response = await usecase.run(input);
    expect(response.firstName).toBe(user1.firstName);
    expect(response.lastName).toBe(user1.lastName);
    expect(response.email).toBe(user1.email);
    expect(response.isActive).toBe(true);
    expect(response.isDeleted).toBe(false);
  });

  it('should create an random nickname', async () => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();

    const user1 = {
      firstName: firstName,
      lastName: lastName,
      email: faker.internet.email({ firstName, lastName }),
      password: faker.internet.password(),
    };

    const user2 = {
      firstName: firstName,
      lastName: lastName,
      email: faker.internet.email({ firstName, lastName, provider: 'webforest.eco' }),
      password: faker.internet.password(),
    };
    const response1 = await usecase.run(new CreateUserUseCaseInput(user1));
    const response2 = await usecase.run(new CreateUserUseCaseInput(user2));
    const isSameNickName = response1.nickName === response2.nickName
    expect(response1.nickName).toBeDefined()
    expect(response2.nickName).toBeDefined()
    expect(isSameNickName).toBeFalsy()
  });

  it('should not create an nickname bigger than 16 characters', async () => {
    const firstName = 'FredericoAntonio';
    const lastName = 'MonteirodaSilva'
    const user1 = {
      firstName: firstName,
      lastName: lastName,
      nickName: faker.internet.userName({ firstName, lastName }),
      email: faker.internet.email({ firstName, lastName }),
      password: faker.internet.password(),
    };
    const input = new CreateUserUseCaseInput(user1);
    const response = await usecase.run(input);
    expect(response.nickName.length).toBe(16);
  });

  it('should create an random nickname looking in database', async () => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();

    const user1 = {
      firstName: firstName,
      lastName: lastName,
      email: faker.internet.email({ firstName, lastName }),
      password: faker.internet.password(),
    };

    const user2 = {
      firstName: firstName,
      lastName: lastName,
      email: faker.internet.email({ firstName, lastName, provider: 'webforest.eco' }),
      password: faker.internet.password(),
    };

    const response1 = await usecase.run(new CreateUserUseCaseInput(user1));
    jest.spyOn(usecase as any, 'generateNickName').mockResolvedValueOnce(response1.nickName).mockResolvedValue(faker.internet.userName())
    const response2 = await usecase.run(new CreateUserUseCaseInput(user2));
    expect(response1.nickName).toBeDefined()
    expect(response2.nickName).toBeDefined()
    expect(response1.nickName).not.toBe(response2.nickName)
  });

  it('should not create an user with same email', async () => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const user1 = {
      firstName: firstName,
      lastName: lastName,
      nickName: faker.internet.userName({ firstName, lastName }),
      email: faker.internet.email({ firstName, lastName }),
      password: faker.internet.password(),
    };
    const input = new CreateUserUseCaseInput(user1);
    await usecase.run(input);

    expect(async () => {
      await usecase.run(input);
    }).rejects.toThrow(
      '{"message":"User Already Registered","code":"WF-0001"}',
    );
  });
});
