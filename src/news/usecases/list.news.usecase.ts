import { Inject, Logger } from '@nestjs/common';
import IUseCase from '../../domain/interfaces/usecase/IUseCase';

import { Like } from 'typeorm';
import { NewsRepositoryToken } from '../news.tokens';
import { INewsRepository } from '../../domain/interfaces/repositories/news.repository.interface';
import ListNewsUseCaseInput from './dtos/list.news.usecase.input';
import ListNewsUseCaseOutput from './dtos/list.news.usecase.output';

export default class ListNewsUseCase
  implements IUseCase<ListNewsUseCaseInput, ListNewsUseCaseOutput>
{
  private readonly logger = new Logger(ListNewsUseCase.name);

  constructor(
    @Inject(NewsRepositoryToken)
    private readonly newsRepository: INewsRepository,
  ) {}

  async run(input: ListNewsUseCaseInput): Promise<ListNewsUseCaseOutput> {
    this.logger.log('Starting')
    const skip = input.itemsPerPage * input.page - input.itemsPerPage;

    let selectQueryBuilder = this.newsRepository
      .createQueryBuilder()
      .where({ isDeleted: false });

    if (input.title) {
      selectQueryBuilder = selectQueryBuilder.andWhere([
        { title: Like(`%${input.title}%`) },
      ]);
    }

    const data = await selectQueryBuilder
      .skip(skip)
      .take(input.itemsPerPage)
      .getManyAndCount();

    return new ListNewsUseCaseOutput({
      items: data[0],
      total: data[1],
      page: input.page,
      itemsPerPage: input.itemsPerPage,
      totalPages: Math.ceil(data[1] / input.itemsPerPage),
    });
  }
}
