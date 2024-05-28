import { CustomError } from './custom.error';

export default class UserNotActivatedError extends CustomError {
  constructor() {
    super('User Not Activated', '0003');
  }
}
