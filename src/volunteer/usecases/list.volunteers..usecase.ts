import { Inject, Logger } from '@nestjs/common';
import IUseCase from '../../domain/interfaces/usecase/IUseCase';
import ListVolunteersUseCaseInput from './dtos/list.volunteers.usecase.input';
import ListVolunteersUseCaseOutput from './dtos/list.volunteers.usecase.output';
import { IVolunteerRepository } from '../../domain/interfaces/repositories/volunteer.repository.interface';
import { VolunteerRepositoryToken } from '../volunteer.tokens';
import { Like } from 'typeorm';

export default class ListVolunteersUseCase
  implements IUseCase<ListVolunteersUseCaseInput, ListVolunteersUseCaseOutput>
{
  private readonly logger = new Logger(ListVolunteersUseCase.name);

  constructor(
    @Inject(VolunteerRepositoryToken)
    private readonly volunteerRespository: IVolunteerRepository,
  ) {}

  async run(
    input: ListVolunteersUseCaseInput,
  ): Promise<ListVolunteersUseCaseOutput> {
    const skip = input.itemsPerPage * input.page - input.itemsPerPage;

    let selectQueryBuilder = this.volunteerRespository
      .createQueryBuilder()
      .where({ isDeleted: false });

    if (input.name) {
      selectQueryBuilder = selectQueryBuilder.andWhere([
        { name: Like(`%${input.name}%`) },
      ]);
    }

    const data = await selectQueryBuilder
      .skip(skip)
      .take(input.itemsPerPage)
      .getManyAndCount();

    return new ListVolunteersUseCaseOutput({
      items: data[0],
      total: data[1],
      page: input.page,
      itemsPerPage: input.itemsPerPage,
      totalPages: Math.ceil(data[1] / input.itemsPerPage),
    });
  }
}
