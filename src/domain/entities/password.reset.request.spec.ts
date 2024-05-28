import { PasswordResetRequest } from './password.reset.request';

describe('PasswordResetRequest', () => {
  const entity: PasswordResetRequest = new PasswordResetRequest();

  it('should be defined', () => {
    expect(entity).toBeDefined();
  });
});
