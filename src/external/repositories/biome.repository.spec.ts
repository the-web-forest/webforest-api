import { TestingModule, Test } from '@nestjs/testing';
import { TypeOrmSQLITETestingModule } from '../../test-utils/database/TypeORMSQLITETestingModule';
import BiomeRepository from './biome.repository';
import { IBiomeRepository } from '../../domain/interfaces/repositories/biome.repository.interface';
import { BiomeRepositoryToken } from '../../biome/biome.token';
import BiomeSeedTestHelper from '../../test-utils/database/biome.seed';
import { Biome } from '../../domain/entities/biome';

describe('Biome Repository Tests', () => {
  let biomeRepository: IBiomeRepository;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmSQLITETestingModule()],
      providers: [
        {
          provide: BiomeRepositoryToken,
          useClass: BiomeRepository,
        },
      ],
    }).compile();
    biomeRepository = module.get<BiomeRepository>(BiomeRepositoryToken);
    await BiomeSeedTestHelper.seed(biomeRepository);
  });

  it('should find biomes', async () => {
    const biomes = await biomeRepository.find();
    expect(biomes[0]).toBeInstanceOf(Biome);
  });

  it('should find all biomes', async () => {
    const biomes = await biomeRepository.find();
    expect(biomes.length).toBe(3);
  });
});
