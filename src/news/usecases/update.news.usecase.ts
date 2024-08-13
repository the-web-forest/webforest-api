import { Inject, Logger } from "@nestjs/common";
import IUseCase from "../../domain/interfaces/usecase/IUseCase";
import UpdateNewsUseCaseInput from "./dtos/update.news.usecase.input";
import UpdateNewsUseCaseOutuput from "./dtos/update.news.usecase.output";
import { NewsRepositoryToken } from "../news.tokens";
import { INewsRepository } from "../../domain/interfaces/repositories/news.repository.interface";
import NewsNotFoundError from "../../core/error/news.not.found.error";
import { News } from "../../domain/entities/news";
import NewsAlreadyRegisteredError from "../../core/error/news.already.registered.error";
import { Not } from "typeorm";

export default class UpdateNewsUseCase
    implements IUseCase<UpdateNewsUseCaseInput, UpdateNewsUseCaseOutuput> {
    private readonly logger = new Logger(UpdateNewsUseCase.name);
    constructor(
        @Inject(NewsRepositoryToken)
        private readonly newsRepository: INewsRepository,
    ) { }


    async run(input: UpdateNewsUseCaseInput): Promise<UpdateNewsUseCaseOutuput> {
        this.logger.log('Starting')

        const news = await this.newsRepository.findOne({ where: { id: input.id } });

        if (!news) {
            throw new NewsNotFoundError();
        }
        
        return await this.update(input, news);
    }


    private async update(input: UpdateNewsUseCaseInput, news: News): Promise<News> {

        Object.assign(news, input);

        if (input.url) {
            this.logger.log('Updating news url')
            const urlIsAlreadyRegistered = await this.newsRepository.findOne({ where: { url: input.url, id: Not(news.id) } });

            if (urlIsAlreadyRegistered) {
                this.logger.warn(`News ${urlIsAlreadyRegistered.url} is already registered`)
                throw new NewsAlreadyRegisteredError()
            }

            this.logger.log(`Url ${input.url} is free to use`)
        }

        news.updatedAt = new Date()

        return await news.save();

    }

}