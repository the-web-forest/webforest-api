import { IsString } from "class-validator";
import PartialClass from "../../../domain/base/partial.class";
import { ApiProperty } from "@nestjs/swagger";
import UpdateNewsUseCaseOutuput from "../../usecases/dtos/update.news.usecase.output";
import CreateNewsControllerOutput from "./create.news.controller.output";
import { News } from "../../../domain/entities/news";

export default class UpdateNewsControllerOutput extends CreateNewsControllerOutput {
   
    }

// static fromUseCaseResponse(response: UpdateNewsUseCaseOutuput) {
//         return new UpdateNewsControllerOutput({
//             ...response
//         });
//     }
// }