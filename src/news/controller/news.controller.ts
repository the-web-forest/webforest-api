import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import CreateNewsControllerInput from './dtos/create.news.controller.input';
import CreateNewsControllerOutput from './dtos/create.news.controller.output';
import {
  CreateNewsUseCaseToken,
  GetNewsByIdUseCaseToken,
  ListNewsUseCaseToken,
} from '../news.tokens';
import CreateNewsUseCaseInput from '../usecases/dtos/create.news.usecase.input';
import IUseCase from '../../domain/interfaces/usecase/IUseCase';
import CreateNewsUseCaseOutput from '../usecases/dtos/create.news.usecase.output';
import GetNewsByIdUseCaseInput from '../usecases/dtos/get.news.by.id.usecase.input';
import GetNewsByIdUseCaseOutput from '../usecases/dtos/get.news.by.id.usecase.output';
import { Roles } from '../../auth/decorators/role.decorator';
import { RolesEnum } from '../../auth/enums/roles';
import GetBiomeByIdUseCaseOutput from '../../biome/usecases/dtos/get.biome.by.id.usecase.output';
import { Public } from '../../auth/decorators/public.decorator';
import ListNewsUseCaseInput from '../usecases/dtos/list.news.usecase.input';
import ListNewsUseCaseOutput from '../usecases/dtos/list.news.usecase.output';
import ListNewsInput from './dtos/list.news.input';
import ListNewsOutput from './dtos/list.news.output';

@Controller('news')
@ApiTags('News')
export class NewsController {
  constructor(
    @Inject(CreateNewsUseCaseToken)
    private readonly createNewsUseCase: IUseCase<
      CreateNewsUseCaseInput,
      CreateNewsUseCaseOutput
    >,

    @Inject(GetNewsByIdUseCaseToken)
    private readonly getNewsByIdUseCase: IUseCase<
      GetNewsByIdUseCaseInput,
      GetNewsByIdUseCaseOutput
    >,

    @Inject(ListNewsUseCaseToken)
    private readonly listNewsUseCase: IUseCase<
      ListNewsUseCaseInput,
      ListNewsUseCaseOutput
    >,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create News' })
  @ApiResponse({ status: HttpStatus.OK, type: CreateNewsControllerOutput })
  async createNews(
    @Body() input: CreateNewsControllerInput,
  ): Promise<CreateNewsControllerOutput> {
    const useCaseInput = new CreateNewsUseCaseInput({ ...input });
    return await this.createNewsUseCase.run(useCaseInput);
  }

  @Get('/list')
  @Public()
  @ApiOperation({ summary: 'List News' })
  @ApiResponse({ status: HttpStatus.OK, type: ListNewsOutput })
  async getTopVolunteerByQuantity(
    @Query() query: ListNewsInput,
  ): Promise<ListNewsOutput> {
    const useCaseInput = new ListNewsUseCaseInput({
      ...query,
    });
    return await this.listNewsUseCase.run(useCaseInput);
  }

  @Get(':id')
  @Roles(RolesEnum.Admin)
  @ApiOperation({ summary: 'Get News By Id' })
  @ApiResponse({ status: HttpStatus.OK, type: GetBiomeByIdUseCaseOutput })
  async GetNewsByIdUseCaseInput(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<GetNewsByIdUseCaseOutput> {
    const useCaseInput = new GetNewsByIdUseCaseInput({
      id,
    });
    return await this.getNewsByIdUseCase.run(useCaseInput);
  }
}
