import { RolesEnum } from './roles';

describe('RolesEnum', () => {
  const roles = RolesEnum;

  it('should be defined', () => {
    expect(roles).toBeDefined();
  });

  it('should match status', () => {
    expect(roles.Admin).toBe(1);
    expect(roles.User).toBe(2);
  });
});
