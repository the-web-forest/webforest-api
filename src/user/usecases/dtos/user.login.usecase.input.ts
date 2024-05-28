import PartialClass from '../../../domain/base/partial.class';

export default class UserLoginUseCaseInput extends PartialClass {
  email: string;
  password: string;
}
