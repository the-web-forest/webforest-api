import { IBiomeRepository } from '../../domain/interfaces/repositories/biome.repository.interface';
import { IRoleRepository } from '../../domain/interfaces/repositories/role.repository.interface';

export default class BiomeSeedTestHelper {
  static async seed(biomeRepository: IBiomeRepository) {
    await biomeRepository.save({
      name: 'Bioma 1',
    });
    await biomeRepository.save({
      name: 'Bioma 2',
    });
    await biomeRepository.save({
      name: 'Bioma 3',
    });
  }
}
