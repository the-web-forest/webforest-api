import PartialClass from "../../../domain/base/partial.class";

export default class UpdateNewsUseCaseInput extends PartialClass {
    id: number;
    title: string;
    url: string;
    imageUrl: string;
    publishDate: Date;
}