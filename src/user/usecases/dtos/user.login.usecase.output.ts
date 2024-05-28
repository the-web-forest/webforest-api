import PartialClass from "../../../domain/base/partial.class";

export default class UserLoginUseCaseOutput extends PartialClass {
    token: string
    expiration: Date
}