import { UserRole } from "./user.role";

describe('UserRole', () => {
    let entity: UserRole = new UserRole();

    it('should be defined', () => {
        expect(entity).toBeDefined();
    });
});
