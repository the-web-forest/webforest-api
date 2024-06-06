import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import CreateNewsControllerInput from './controller/dto/create.news.controller.input';
import CreateNewsControllerOutput from './controller/dto/create.news.controller.output';
import IUseCase from '../domain/interfaces/usecase/IUseCase';
import CreateNewsUseCaseInput from './usecases/dtos/create.news.usecase.input';
import CreateNewsUseCaseOutput from './usecases/dtos/create.news.usecase.output';
import { CreateNewsUseCaseToken } from './news.tokens';

@Controller('news')
@ApiTags('News')
export class NewsController {

    constructor(
        @Inject(CreateNewsUseCaseToken)
        private readonly createNewsUseCase: IUseCase<CreateNewsUseCaseInput, CreateNewsUseCaseOutput>
    ) { }

    @Post()
    async createNews(@Body() input: CreateNewsControllerInput): Promise<CreateNewsControllerOutput> {
        const useCaseInput = new CreateNewsUseCaseInput({ ...input });
        return await this.createNewsUseCase.run(useCaseInput);
    }


}
