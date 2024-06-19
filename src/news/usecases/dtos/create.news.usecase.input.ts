import PartialClass from "../../../domain/base/partial.class"

export default class CreateNewsUseCaseInput extends PartialClass {
    title: string
    url: string
    imageUrl: string
    publishDate: Date
}