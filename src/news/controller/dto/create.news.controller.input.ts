import { IsDateString, IsNotEmpty, IsString, IsUrl } from "class-validator"

export default class CreateNewsControllerInput {
    @IsString()
    @IsNotEmpty()
    title: string

    @IsString()
    @IsNotEmpty()
    @IsUrl()
    url: string
    
    @IsString()
    @IsNotEmpty()
    @IsUrl()
    imageUrl: string

    @IsDateString()
    @IsNotEmpty()
    publishDate: string
}