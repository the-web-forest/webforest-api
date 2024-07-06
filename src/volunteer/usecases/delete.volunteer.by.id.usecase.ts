import { Inject, Injectable, Logger } from '@nestjs/common';
import IUseCase from '../../domain/interfaces/usecase/IUseCase';
import GetVolunteerByIdUseCaseInput from '../controller/dtos/get.volunteer.by.id.usecase.input';
import GetNewsByIdUseCase from '../../news/usecases/get.news.by.id.usecase';
import { VolunteerRepositoryToken } from '../volunteer.tokens';
import { IVolunteerRepository } from '../../domain/interfaces/repositories/volunteer.repository.interface';
import VolunteerNotFoundError from '../../core/error/volunteer.not.found.error';
import DeleteVolunteerByIdUsecaseOutput from '../controller/dtos/delete.volunteer.by.id.output';
import DeleteVolunteerByIdUseCaseInput from '../controller/dtos/delete.volunteer.by.id.usecase.input';

@Injectable()
export default class DeleteVolunteerByIdUseCase
  implements
    IUseCase<DeleteVolunteerByIdUseCaseInput, DeleteVolunteerByIdUsecaseOutput>
{
  private readonly logger = new Logger(DeleteVolunteerByIdUseCase.name);

  constructor(
    @Inject(VolunteerRepositoryToken)
    private readonly volunteerRespository: IVolunteerRepository,
  ) {}

  async run(
    input: DeleteVolunteerByIdUseCaseInput,
  ): Promise<DeleteVolunteerByIdUsecaseOutput> {
    this.logger.log('Starting');

    const volunteer = await this.volunteerRespository.findOne({
      where: { id: input.id, isDeleted: false },
    });

    if (!volunteer) {
      throw new VolunteerNotFoundError();
    }

    volunteer.isDeleted = true;

    volunteer.save()

    return volunteer;
  }
}
