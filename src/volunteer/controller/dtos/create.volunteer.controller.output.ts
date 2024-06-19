import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Volunteer } from "../../../domain/entities/volunteer";

export default class CreateVolunteerControllerOutput extends Volunteer {}