import { CustomError } from './custom.error';

export default class UserNotFoundError extends CustomError {
  constructor() {
    super('User Not Found', '0002');
  }
}
