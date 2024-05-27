import PartialClass from "../../../domain/base/partial.class";

export default class SendUserActivationEmailUseCaseOutput extends PartialClass {
    email: string;
    processedAt: Date;
}