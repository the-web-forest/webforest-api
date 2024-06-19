import PartialClass from "../../../domain/base/partial.class";

export default class CreateVolunteerUseCaseInput extends PartialClass {
    name: string;
    role: string;
    linkedInUrl: string;
    photoUrl: string;
}