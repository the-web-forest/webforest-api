import { User } from "./user";

describe('User', () => {
    let entity: User = new User();

    it('should be defined', () => {
        expect(entity).toBeDefined();
    });
});
