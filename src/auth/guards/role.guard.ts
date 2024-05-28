import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/role.decorator';
import { RolesEnum } from '../enums/roles';
import { Role } from '../../domain/entities/role';
import { User } from '../../domain/entities/user';

type Request = {
  user: User;
};
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles: number[] = this.reflector.getAllAndOverride<
      RolesEnum[]
    >(ROLES_KEY, [context.getHandler(), context.getClass()]);

    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest() as Request;

    if (user.roles.length === 0) {
      return false;
    }

    if (user.roles.find((x: Role) => x.id === RolesEnum.Admin)) {
      return true;
    }

    const commonRoles = requiredRoles.filter((x) =>
      user.roles.some((o) => o.id === x),
    );

    return !!commonRoles.length;
  }
}
