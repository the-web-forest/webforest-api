import { IsNotEmpty, IsString } from "class-validator";

export default class CreateVolunteerControllerInput {
    name: string;

    @IsString()
    @IsNotEmpty()
    linkedInUrl: string;
}