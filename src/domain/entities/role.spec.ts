import { Role } from './role';

describe('Role', () => {
  const entity: Role = new Role();

  it('should be defined', () => {
    expect(entity).toBeDefined();
  });
});
