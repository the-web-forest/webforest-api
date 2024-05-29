import { Injectable } from '@nestjs/common';
import BaseRepository from './base.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Volunteer } from '../../domain/entities/volunteer';
import { IVolunteerRepository } from '../../domain/interfaces/repositories/volunteer.repository.interface';

@Injectable()
export default class VolunteerRepository
  extends BaseRepository<Volunteer>
  implements IVolunteerRepository
{
  constructor(
    @InjectRepository(Volunteer)
    private readonly volunteerRepository: Repository<Volunteer>,
  ) {
    super(volunteerRepository);
  }
}
