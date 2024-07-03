import { Inject, Injectable, Logger } from "@nestjs/common";
import IUseCase from "../../domain/interfaces/usecase/IUseCase";
import GetNewsByIdUseCaseInput from "./dtos/get.news.by.id.usecase.input";
import GetNewsByIdUseCaseOutput from "./dtos/get.news.by.id.usecase.output";
import { NewsRepositoryToken } from "../news.tokens";
import NewsRepository from "../../external/repositories/news.repository";
import { INewsRepository } from "../../domain/interfaces/repositories/news.repository.interface";
import NewsNotFoundError from "../../core/error/news.not.found.error";

@Injectable()
export default class GetNewsByIdUseCase implements IUseCase<GetNewsByIdUseCaseInput, GetNewsByIdUseCaseOutput> {
    private readonly logger = new Logger(GetNewsByIdUseCase.name);

    constructor(
        @Inject(NewsRepositoryToken)
        private readonly newsRepository: INewsRepository,
    ) { }

    async run(input: GetNewsByIdUseCaseInput): Promise<GetNewsByIdUseCaseOutput> {
        this.logger.log('Starting')

        const news = await this.newsRepository.findOne({ where: { id: input.id, isDeleted: false } });
         
        if (!news) {
            throw new NewsNotFoundError();
        };

        return news
    }
}