import { Inject, Injectable, Logger } from '@nestjs/common';
import IUseCase from '../../domain/interfaces/usecase/IUseCase';
import GetVolunteerByIdUseCaseInput from '../controller/dtos/get.volunteer.by.id.usecase.input';
import GetNewsByIdUseCase from '../../news/usecases/get.news.by.id.usecase';
import { VolunteerRepositoryToken } from '../volunteer.tokens';
import { IVolunteerRepository } from '../../domain/interfaces/repositories/volunteer.repository.interface';
import VolunteerNotFoundError from '../../core/error/volunteer.not.found.error';
import GetVolunteerByIdUsecaseOutput from '../controller/dtos/get.volunteer.by.id.output';

@Injectable()
export default class GetVolunteerByIdUseCase
  implements
    IUseCase<GetVolunteerByIdUseCaseInput, GetVolunteerByIdUsecaseOutput>
{
  private readonly logger = new Logger(GetNewsByIdUseCase.name);

  constructor(
    @Inject(VolunteerRepositoryToken)
    private readonly volunteerRespository: IVolunteerRepository,
  ) {}

  async run(
    input: GetVolunteerByIdUseCaseInput,
  ): Promise<GetVolunteerByIdUsecaseOutput> {
    this.logger.log('Starting');

    const volunteer = await this.volunteerRespository.findOne({
      where: { id: input.id, isDeleted: false },
    });

    if (!volunteer) {
      throw new VolunteerNotFoundError();
    }

    return volunteer;
  }
}
