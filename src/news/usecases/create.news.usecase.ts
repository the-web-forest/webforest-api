import { Inject } from '@nestjs/common';
import IUseCase from '../../domain/interfaces/usecase/IUseCase';
import CreateNewsUseCaseInput from './dtos/create.news.usecase.input';
import CreateNewsUseCaseOutput from './dtos/create.news.usecase.output';
import { NewsRepositoryToken } from '../news.tokens';
import { INewsRepository } from '../../domain/interfaces/repositories/news.repository.interface';

export default class CreateNewsUseCase
  implements IUseCase<CreateNewsUseCaseInput, CreateNewsUseCaseOutput>
{
  constructor(
    @Inject(NewsRepositoryToken)
    private readonly newsRepository: INewsRepository,
  ) {}

  async run(input: CreateNewsUseCaseInput): Promise<CreateNewsUseCaseOutput> {
    return await this.newsRepository.save({
      ...input,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}
