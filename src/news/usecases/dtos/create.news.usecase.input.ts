import PartialClass from "../../../domain/base/partial.class"

export default class CreateNewsUseCaseInpu extends PartialClass {
    title: string
    url: string
    imageUrl: string
    publishDate: Date
}