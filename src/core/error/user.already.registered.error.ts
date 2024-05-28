import { CustomError } from './custom.error';

export default class UserAlreadyRegistered extends CustomError {
  constructor() {
    super('User Already Registered', '0001');
  }
}
