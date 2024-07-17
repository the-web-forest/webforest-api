import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsDateString, IsString, IsUrl } from "class-validator";

export default class UpdateNewsRequestInput {
    @IsString()
    @ApiProperty({
        description: 'News title',
    })
    title: string;

    @IsString()
    @IsUrl()
    @ApiProperty({
        description: 'News URL'
    })
    url: string;

    @IsString()
    @IsUrl()
    @ApiProperty({
        description: 'Image URL of the news',
    })
    imageUrl: string;

    @IsDateString()
    @ApiProperty({
        description: 'Publish date of the news',
        format: 'date-time'
    })
    publishDate: Date;
}