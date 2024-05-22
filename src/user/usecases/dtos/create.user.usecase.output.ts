import { User } from "src/domain/entities/user"
import PartialClass from "../../../domain/base/partial.class"

export default class CreateUserUseCaseOutput extends PartialClass {
    id: number
    firstName: string
    lastName: string
    email: string
    isActive: boolean
    isDeleted: boolean
    createdAt: Date
    updatedAt: Date

    static createFromUser(user: User) {
        return new CreateUserUseCaseOutput({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            isActive: user.isActive,
            isDeleted: user.isDeleted,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        })
    }
}