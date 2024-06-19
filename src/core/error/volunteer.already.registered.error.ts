import { CustomError } from './custom.error';

export default class VolunteerAlreadyRegisteredError extends CustomError {
  constructor() {
    super('Volunteer Already Registered', '0006');
  }
}
