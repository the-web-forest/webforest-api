import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { DataSource } from 'typeorm';
import { User } from './domain/entities/user';
import { PasswordResetRequest } from './domain/entities/password.reset.request';
import { UserRole } from './domain/entities/user.role';
import { Role } from './domain/entities/role';
import { APP_INTERCEPTOR } from '@nestjs/core';
import ErrorsInterceptor from './interceptors/error.interceptor';
import { ActivationRequest } from './domain/entities/activation.request';
import { MailServiceToken } from './app.tokens';
import MailService from './external/services/mail.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    AuthModule,
    CoreModule,
    TypeOrmModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        type: 'mysql',
        host: config.get('DB_HOST'),
        port: config.get('DB_PORT'),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_DATABASE'),
        entities: [User, UserRole, Role, PasswordResetRequest, ActivationRequest],
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [{
    provide: APP_INTERCEPTOR,
    useClass: ErrorsInterceptor
  }],
})
export class AppModule {
  constructor(private dataSource: DataSource) { }
}
