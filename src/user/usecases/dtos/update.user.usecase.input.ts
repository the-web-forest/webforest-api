import PartialClass from '../../../domain/base/partial.class';

export default class UpdateUserUseCaseInput extends PartialClass {
  id: number;
  firstName?: string;
  lastName?: string;
  nickName?: string;
  password?: string;
}
