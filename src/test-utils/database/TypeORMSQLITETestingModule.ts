import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivationRequest } from '../../domain/entities/activation.request';
import { PasswordResetRequest } from '../../domain/entities/password.reset.request';
import { Role } from '../../domain/entities/role';
import { User } from '../../domain/entities/user';
import { Biome } from '../../domain/entities/biome';
import { News } from '../../domain/entities/news';
import { Volunteer } from '../../domain/entities/volunteer';

const entities = [
  Role,
  User,
  ActivationRequest,
  PasswordResetRequest,
  Biome,
  News,
  Volunteer,
];

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
