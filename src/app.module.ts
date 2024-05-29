import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { DataSource } from 'typeorm';
import { User } from './domain/entities/user';
import { PasswordResetRequest } from './domain/entities/password.reset.request';
import { Role } from './domain/entities/role';
import { APP_INTERCEPTOR } from '@nestjs/core';
import ErrorsInterceptor from './interceptors/error.interceptor';
import { ActivationRequest } from './domain/entities/activation.request';
import { VolunteerModule } from './volunteer/volunteer.module';
import { BiomeModule } from './biome/biome.module';
import { Biome } from './domain/entities/biome';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    AuthModule,
    CoreModule,
    VolunteerModule,
    BiomeModule,
    TypeOrmModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        type: 'mysql',
        host: config.get('DB_HOST'),
        port: config.get('DB_PORT'),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_DATABASE'),
        entities: [User, Role, PasswordResetRequest, ActivationRequest, Biome],
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorsInterceptor,
    },
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
