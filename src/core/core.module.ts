import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Config } from 'src/domain/constants/config.constants';

@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: async (config: ConfigService) => ({
        global: true,
        secret: config.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: `${Config.jwtExpirationTimeInHours}h` },
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [JwtModule],
})
export class CoreModule {}
