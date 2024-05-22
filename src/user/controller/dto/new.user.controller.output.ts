import { ApiProperty } from "@nestjs/swagger"

export default class NewUserControllerOutput {
    @ApiProperty({
        description: 'User created id'
    })
    id: number
    @ApiProperty({
        description: 'User created name'
    })
    firstName: string
}