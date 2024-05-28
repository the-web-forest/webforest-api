import { Test, TestingModule } from "@nestjs/testing";
import { TypeOrmSQLITETestingModule } from "../../test-utils/database/TypeORMSQLITETestingModule";
import { CreateUserUseCaseToken, RoleRepositoryToken, UserRepositoryToken } from "../user.tokens";
import UserRepository from "../../external/repositories/user.repository";
import CreateUserUseCaseInput from "./dtos/create.user.usecase.input";
import CreateUserUseCaseOutput from "./dtos/create.user.usecase.output";
import IUseCase from "../../domain/interfaces/usecase/IUseCase";
import CreateUserUseCase from "./create.user.usecase";
import RoleRepository from "../../external/repositories/role.repository";

describe('Create User Use Case', () => {
  let usecase: IUseCase<CreateUserUseCaseInput, CreateUserUseCaseOutput>
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmSQLITETestingModule()],
      providers: [
        {
          provide: CreateUserUseCaseToken,
          useClass: CreateUserUseCase
        },
        {
          provide: UserRepositoryToken,
          useClass: UserRepository
        },
        {
          provide: RoleRepositoryToken,
          useClass: RoleRepository
        }
      ],
    }).compile();
    usecase = module.get<IUseCase<CreateUserUseCaseInput, CreateUserUseCaseOutput>>(CreateUserUseCaseToken)
  });

  it('should create an user', async () => {
    const user1 = {
      firstName: 'Matheus',
      lastName: 'Barros',
      email: 'mdbf42@gmail.com',
      password: 'teste123'
    }
    const input = new CreateUserUseCaseInput(user1)
    const response = await usecase.run(input)
    expect(response.firstName).toBe(user1.firstName)
    expect(response.lastName).toBe(user1.lastName)
    expect(response.email).toBe(user1.email)
    expect(response.isActive).toBe(true)
    expect(response.isDeleted).toBe(false)
  });

  it('should not create an user with same email', async () => {
    const user1 = {
      firstName: 'Matheus',
      lastName: 'Barros',
      email: 'mdbf43@gmail.com',
      password: 'teste123'
    }
    const input = new CreateUserUseCaseInput(user1)
    await usecase.run(input)

    expect(async () => {
      await usecase.run(input)
    }).rejects.toThrow('{"message":"User Already Registered","code":"WF-0001"}');
    
  });
});
