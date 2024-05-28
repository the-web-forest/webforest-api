import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivationRequest } from '../../domain/entities/activation.request';
import { PasswordResetRequest } from '../../domain/entities/password.reset.request';
import { Role } from '../../domain/entities/role';
import { User } from '../../domain/entities/user';

const entities = [Role, User, ActivationRequest, PasswordResetRequest]

export const TypeOrmSQLITETestingModule = () => [
  TypeOrmModule.forRoot({
    type: 'better-sqlite3',
    database: ':memory:',
    dropSchema: true,
    entities: entities,
    synchronize: true,
  }),
  TypeOrmModule.forFeature(entities),
];