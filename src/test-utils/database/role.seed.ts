import { IRoleRepository } from '../../domain/interfaces/repositories/role.repository.interface';

export default class RoleSeedTestHelper {
  static async seed(roleRepository: IRoleRepository) {
    await roleRepository.save({
      name: 'Admin',
    });
    await roleRepository.save({
      name: 'User',
    });
    await roleRepository.save({
      name: 'TempUser',
    });
  }
}
