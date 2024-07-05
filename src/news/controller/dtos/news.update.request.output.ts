import { IsString } from "class-validator";
import PartialClass from "../../../domain/base/partial.class";
import { ApiProperty } from "@nestjs/swagger";
import UpdateNewsUseCaseOutuput from "../../usecases/dtos/update.news.usecase.output";

export default class NewsUpdateRequestOutPut extends PartialClass {
    @IsString()
    @ApiProperty({
        description: 'News Title',
    })
    title: string;

    static fromUseCaseResponse(response: UpdateNewsUseCaseOutuput) {
        return new NewsUpdateRequestOutPut({
            ...response
        })
    }
}