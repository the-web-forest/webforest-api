import { IsDateString, IsNotEmpty, IsString, IsUrl } from "class-validator"
import PartialClass from "../../../domain/base/partial.class"
import { ApiProperty } from "@nestjs/swagger"

export default class CreateNewsControllerInput extends PartialClass {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'News title',
    })
    title: string

    @IsString()
    @IsNotEmpty()
    @IsUrl()
    @ApiProperty({
        description: 'News url',
    })
    url: string

    @IsString()
    @IsNotEmpty()
    @IsUrl()
    @ApiProperty({
        description: 'News image url',
    })
    imageUrl: string

    @IsDateString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'News publish date',
    })
    publishDate: Date
}