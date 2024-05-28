import { TestingModule, Test } from "@nestjs/testing";
import { UserRepositoryToken } from "../../user/user.tokens";
import { IUserRepository } from "../../domain/interfaces/repositories/user.repository.interface";
import UserRepository from "./user.repository";
import UserSeedTestHelper from "../../test-utils/database/user.seed";
import { TypeOrmSQLITETestingModule } from "../../test-utils/database/TypeORMSQLITETestingModule";
import { User } from "../../domain/entities/user";


describe('User Repository Tests', () => {
  let userRepository: IUserRepository
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmSQLITETestingModule()],
      providers: [
        {
          provide: UserRepositoryToken,
          useClass: UserRepository
        }
      ],
    }).compile();
    userRepository = module.get<UserRepository>(UserRepositoryToken)
    await UserSeedTestHelper.seed(userRepository)
  });

  it('should find an user', async () => {
    const user = await  userRepository.findOne({ where: { id: 1 } })
    expect(user).toBeInstanceOf(User);
    expect(user.firstName).toBe('Ana')
    expect(user.lastName).toBe('Silva')
  });

});
