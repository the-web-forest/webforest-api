import PartialClass from "src/domain/base/partial.class";

export default class CreateUserUseCaseInput extends PartialClass {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}