import { Body, Controller, HttpStatus, Inject, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import CreateNewsControllerInput from './dtos/create.news.controller.input';
import CreateNewsControllerOutput from './dtos/create.news.controller.output';
import { CreateNewsUseCaseToken, NewsRepositoryToken } from './news.tokens';
import CreateNewsUseCaseInput from './usecases/dtos/create.news.usecase.input';
import IUseCase from '../domain/interfaces/usecase/IUseCase';
import CreateNewsUseCaseOutput from './usecases/dtos/create.news.usecase.output';

@Controller('news')
@ApiTags('News')
export class NewsController {

    constructor(
        @Inject(CreateNewsUseCaseToken)
        private readonly createNewsUseCase: IUseCase<CreateNewsUseCaseInput, CreateNewsUseCaseOutput>
    ){}

    @Post()
    @ApiOperation({ summary: 'Create News' })
    @ApiResponse({ status: HttpStatus.OK, type: CreateNewsControllerOutput })
    async createNews(@Body() input: CreateNewsControllerInput): Promise<CreateNewsControllerOutput> {
        const useCaseInput = new CreateNewsUseCaseInput({...input})
        return await this.createNewsUseCase.run(useCaseInput)
    }

}
