import { IsDateString, IsNotEmpty, IsString, IsUrl } from "class-validator"
import PartialClass from "../../domain/base/partial.class"

export default class CreateNewsControllerInput extends PartialClass {
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
    publishDate: Date
}