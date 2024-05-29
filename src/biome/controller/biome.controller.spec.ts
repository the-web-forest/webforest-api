import { Test, TestingModule } from '@nestjs/testing';
import { BiomeController } from './biome.controller';

describe('BiomeController', () => {
  let controller: BiomeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BiomeController],
    }).compile();

    controller = module.get<BiomeController>(BiomeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
