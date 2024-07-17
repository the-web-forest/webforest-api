import { Inject } from '@nestjs/common';
import IUseCase from '../../domain/interfaces/usecase/IUseCase';
import { BiomeRepositoryToken } from '../biome.token';
import { IBiomeRepository } from '../../domain/interfaces/repositories/biome.repository.interface';
import BiomeAlreadyRegisteredError from '../../core/error/biome.already.registered.error';
import CreateBiomeUseCaseInput from './dtos/create.biome.usecase.input';
import CreateBiomeUseCaseOutput from './dtos/create.biome.usecase.output';

export default class CreateBiomeUseCase
  implements IUseCase<CreateBiomeUseCaseInput, CreateBiomeUseCaseOutput>
{
  constructor(
    @Inject(BiomeRepositoryToken)
    private readonly biomeRepository: IBiomeRepository,
  ) {}

  async run(input: CreateBiomeUseCaseInput): Promise<CreateBiomeUseCaseOutput> {
    const biome = await this.biomeRepository.findOne({
      where: { name: input.name },
    });

    if (biome) {
      throw new BiomeAlreadyRegisteredError();
    }

    return await this.biomeRepository.save({
      name: input.name,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}
