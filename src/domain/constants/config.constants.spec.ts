import { Config } from './config.constants';

describe('ConfigConstants', () => {
  const config = Config;

  it('should be defined', () => {
    expect(config).toBeDefined();
  });

  it('should be 12 hours', () => {
    expect(config.jwtExpirationTimeInHours).toBe(12);
  });
});
