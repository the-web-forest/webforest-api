import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, IsUrl } from "class-validator";

export default class CreateVolunteerControllerInput {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Name of the new volunteer',
        
    })
    name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Role of the new volunteer',
        
    })
    role: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @IsUrl()
    @ApiProperty({
        description: 'LinkedIn url'
    })
    linkedInUrl: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @IsUrl()
    @ApiProperty({
        description: 'Volunteer photo url'
    })
    photoUrl: string;
}