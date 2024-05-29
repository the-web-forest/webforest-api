import { Repository } from 'typeorm';
import { Volunteer } from '../../entities/volunteer';

export interface IVolunteerRepository extends Repository<Volunteer> {}
