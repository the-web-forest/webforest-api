import { Inject } from '@nestjs/common';
import IUseCase from '../../domain/interfaces/usecase/IUseCase';
import { VolunteerRepositoryToken } from '../volunteer.tokens';
import { IVolunteerRepository } from '../../domain/interfaces/repositories/volunteer.repository.interface';
import VolunteerAlreadyRegisteredError from '../../core/error/volunteer.already.registered.error';
import UpdateVolunteerUseCaseInput from './dtos/update.volunteer.usecase.input';
import UpdateVolunteerUseCaseOutput from './dtos/update.volunteer.usecase.output';
import { Not } from 'typeorm';

export default class UpdateVolunteerUseCase
  implements
    IUseCase<UpdateVolunteerUseCaseInput, UpdateVolunteerUseCaseOutput>
{
  constructor(
    @Inject(VolunteerRepositoryToken)
    private readonly volunteerRepository: IVolunteerRepository,
  ) {}

  async run(
    input: UpdateVolunteerUseCaseInput,
  ): Promise<UpdateVolunteerUseCaseOutput> {
    const volunteerByLinkedIn = await this.volunteerRepository.findOne({
      where: {
        linkedInUrl: input.linkedInUrl,
        id: Not(input.id),
      },
    });

    if (volunteerByLinkedIn) {
      throw new VolunteerAlreadyRegisteredError();
    }

    return await this.volunteerRepository.save({ ...input });
  }
}
