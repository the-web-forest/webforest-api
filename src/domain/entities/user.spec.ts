import { User } from './user';

describe('User', () => {
  const entity: User = new User();

  it('should be defined', () => {
    expect(entity).toBeDefined();
  });
});
