import PartialClass from '../../../domain/base/partial.class';

export default class ValidateUserActivationEmailUseCaseOutput extends PartialClass {
  email: string;
  processedAt: Date;
}
