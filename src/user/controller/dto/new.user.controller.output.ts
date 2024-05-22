import { ApiProperty } from "@nestjs/swagger"
import PartialClass from "../../../domain/base/partial.class"
import CreateUserUseCaseOutput from "../../../user/usecases/dtos/create.user.usecase.output"

export default class NewUserControllerOutput extends PartialClass {
    @ApiProperty({
        description: 'User created id'
    })
    id: number
    @ApiProperty({
        description: 'User created name'
    })
    firstName: string

    static fromUseCaseResponse(data: CreateUserUseCaseOutput) {
        return new CreateUserUseCaseOutput({
            ...data
        })
    }
}