import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, IsUrl } from "class-validator";
import CreateVolunteerControllerInput from "./create.volunteer.controller.input";

export default class UpdateVolunteerControllerInput extends CreateVolunteerControllerInput {}