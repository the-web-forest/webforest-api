import { Injectable } from '@nestjs/common';
import BaseRepository from './base.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../../domain/entities/role';
import { IRoleRepository } from '../../domain/interfaces/repositories/role.repository.interface';

@Injectable()
export default class RoleRepository
  extends BaseRepository<Role>
  implements IRoleRepository
{
  constructor(
    @InjectRepository(Role)
    private readonly rolesRepository: Repository<Role>,
  ) {
    super(rolesRepository);
  }
}
