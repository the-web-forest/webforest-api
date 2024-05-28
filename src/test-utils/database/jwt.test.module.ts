import { JwtModule } from '@nestjs/jwt';
import { Config } from '../../domain/constants/config.constants';
import { faker } from '@faker-js/faker';

const jwtTestSecret = faker.string.uuid();

export const JwtTestingModule = () => [
  JwtModule.register({
    global: true,
    secret: jwtTestSecret,
    signOptions: { expiresIn: `${Config.jwtExpirationTimeInHours}h` },
  }),
];
