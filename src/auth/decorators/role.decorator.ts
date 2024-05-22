import { SetMetadata } from '@nestjs/common';
import { RolesEnum } from '../enums/roles';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: RolesEnum[]) => SetMetadata(ROLES_KEY, roles);
