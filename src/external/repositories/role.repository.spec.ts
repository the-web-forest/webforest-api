import { TestingModule, Test } from '@nestjs/testing';
import { RoleRepositoryToken } from '../../user/user.tokens';
import { TypeOrmSQLITETestingModule } from '../../test-utils/database/TypeORMSQLITETestingModule';
import { IRoleRepository } from '../../domain/interfaces/repositories/role.repository.interface';
import RoleRepository from './role.repository';
import { Role } from '../../domain/entities/role';
import RoleSeedTestHelper from '../../test-utils/database/role.seed';
import { RolesEnum } from '../../auth/enums/roles';

describe('Role Repository Tests', () => {
  let roleRepository: IRoleRepository;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmSQLITETestingModule()],
      providers: [
        {
          provide: RoleRepositoryToken,
          useClass: RoleRepository,
        },
      ],
    }).compile();
    roleRepository = module.get<RoleRepository>(RoleRepositoryToken);
    await RoleSeedTestHelper.seed(roleRepository);
  });

  it('should find roles', async () => {
    const roles = await roleRepository.find();
    expect(roles[0]).toBeInstanceOf(Role);
  });

  it('should find all roles', async () => {
    const roles = await roleRepository.find();
    expect(roles.length).toBe(Object.keys(RolesEnum).length / 2);
  });
});
