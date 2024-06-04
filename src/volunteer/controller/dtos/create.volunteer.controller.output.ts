import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export default class CreateVolunteerControllerOutput {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    linkedInUrl: string;
}