import PartialClass from '../../../domain/base/partial.class';
import { User } from '../../../domain/entities/user';

export default class UpdateUserUseCaseOutput extends PartialClass {
  firstName: string;
  lastName: string;
  nickName: string;
  updatedAt: Date;

  static fromUser(user: User): UpdateUserUseCaseOutput {
    return new UpdateUserUseCaseOutput({
      firstName: user.firstName,
      lastName: user.lastName,
      nickName: user.nickName,
      updatedAt: user.updatedAt,
    });
  }
}
