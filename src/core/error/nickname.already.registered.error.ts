import { CustomError } from './custom.error';

export default class NickNameAlreadyRegisteredError extends CustomError {
  constructor() {
    super('NickName Already Registered', '0004');
  }
}
