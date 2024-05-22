import { PasswordResetRequest } from "./password.reset";

describe('PasswordResetRequest', () => {
    let entity: PasswordResetRequest = new PasswordResetRequest();

    it('should be defined', () => {
        expect(entity).toBeDefined();
    });
});
