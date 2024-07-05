import { Body, Controller, Get, HttpStatus, Inject, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import CreateNewsControllerInput from './dtos/create.news.controller.input';
import CreateNewsControllerOutput from './dtos/create.news.controller.output';
import { CreateNewsUseCaseToken, GetNewsByIdUseCaseToken, NewsRepositoryToken, UpdateNewsUseCaseToken } from '../news.tokens';
import CreateNewsUseCaseInput from '../usecases/dtos/create.news.usecase.input';
import IUseCase from '../../domain/interfaces/usecase/IUseCase';
import CreateNewsUseCaseOutput from '../usecases/dtos/create.news.usecase.output';
import GetNewsByIdUseCaseInput from '../usecases/dtos/get.news.by.id.usecase.input';
import GetNewsByIdUseCaseOutput from '../usecases/dtos/get.news.by.id.usecase.output';
import { Roles } from '../../auth/decorators/role.decorator';
import { RolesEnum } from '../../auth/enums/roles';
import GetBiomeByIdUseCaseOutput from '../../biome/usecases/dtos/get.biome.by.id.usecase.output';
import UpdateNewsUseCaseOutuput from '../usecases/dtos/update.news.usecase.output';
import NewsUpdateRequestInput from './dtos/news.update.request.input';
import UpdateNewsUseCaseInput from '../usecases/dtos/update.news.usecase.input';

@Controller('news')
@ApiTags('News')
export class NewsController {

    constructor(
        @Inject(CreateNewsUseCaseToken)
        private readonly createNewsUseCase: IUseCase<CreateNewsUseCaseInput, CreateNewsUseCaseOutput>,

        @Inject(GetNewsByIdUseCaseToken)
        private readonly getNewsByIdUseCase: IUseCase<GetNewsByIdUseCaseInput, GetNewsByIdUseCaseOutput>,
   
        @Inject(UpdateNewsUseCaseToken)
        private readonly updateNewsUseCase: IUseCase<UpdateNewsUseCaseInput, UpdateNewsUseCaseOutuput>
    ) { }

    @Post()
    @ApiOperation({ summary: 'Create News' })
    @ApiResponse({ status: HttpStatus.OK, type: CreateNewsControllerOutput })
    async createNews(@Body() input: CreateNewsControllerInput): Promise<CreateNewsControllerOutput> {
        const useCaseInput = new CreateNewsUseCaseInput({ ...input })
        return await this.createNewsUseCase.run(useCaseInput)
    }

    @Get(':id')
    @Roles(RolesEnum.Admin)
    @ApiOperation({ summary: 'Get News By Id' })
    @ApiResponse({ status: HttpStatus.OK, type: GetBiomeByIdUseCaseOutput })
    async GetNewsByIdUseCaseInput(@Param('id', ParseIntPipe) id: number): Promise<GetNewsByIdUseCaseOutput> {
        const useCaseInput = new GetNewsByIdUseCaseInput({
            id
        })
        return await this.getNewsByIdUseCase.run(useCaseInput)
    }

    @Put(':id')
    @Roles(RolesEnum.Admin)
    @ApiOperation({ summary: 'Update News' })
    @ApiResponse({ status: HttpStatus.OK, type: UpdateNewsUseCaseOutuput })
    async updateNews(@Body() input: NewsUpdateRequestInput, @Param('id', ParseIntPipe) id: number): Promise<UpdateNewsUseCaseOutuput> {
        const useCaseInput = new UpdateNewsUseCaseInput({
            id,
            title: input.title
        })
        return await this.updateNewsUseCase.run(useCaseInput)
    }
}
