import {
    Body,
    Controller,
    Get,
    HttpStatus,
    Inject,
    Param,
    ParseIntPipe,
    Post,
    Put,
} from '@nestjs/common';
import { RolesEnum } from '../../auth/enums/roles';
import { Roles } from '../../auth/decorators/role.decorator';
import {
    CreateBiomeUseCaseToken,
    GetBiomeByIdUseCaseToken,
    UpdateBiomeUseCaseToken,
} from '../biome.token';
import IUseCase from '../../domain/interfaces/usecase/IUseCase';
import UpdateBiomeUseCaseInput from '../usecases/dtos/update.biome.usecase.input';
import UpdateBiomeUseCaseOutput from '../usecases/dtos/update.biome.usecase.output';
import GetBiomeByIdUseCaseOutput from '../usecases/dtos/get.biome.by.id.usecase.output';
import GetBiomeByIdUseCaseInput from '../usecases/dtos/get.biome.by.id.usecase.input';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import UpdateBiomeRequestInput from './dtos/update.biome.request.input';
import CreateBiomeUseCaseOutput from '../usecases/dtos/create.biome.usecase.output';
import CreateBiomeControllerInput from './dtos/create.biome.controller.input';
import CreateBiomeUseCaseInput from '../usecases/dtos/create.biome.usecase.input';

@Controller('biome')
@ApiTags('Biome')
export class BiomeController {
    constructor(
        @Inject(CreateBiomeUseCaseToken)
        private readonly newBiomeUseCase: IUseCase<
            CreateBiomeUseCaseInput,
            CreateBiomeUseCaseOutput
        >,

        @Inject(UpdateBiomeUseCaseToken)
        private readonly updateBiomeUseCase: IUseCase<
            UpdateBiomeUseCaseInput,
            UpdateBiomeUseCaseOutput
        >,

        @Inject(GetBiomeByIdUseCaseToken)
        private readonly getBiomeByIdUseCase: IUseCase<
            GetBiomeByIdUseCaseInput,
            GetBiomeByIdUseCaseOutput
        >,
    ) { }

    @Post()
    @Roles(RolesEnum.Admin)
    @ApiOperation({ summary: 'Create new Biome' })
    @ApiResponse({ status: HttpStatus.OK, type: CreateBiomeUseCaseOutput })
    async createBiome(
        @Body() input: CreateBiomeControllerInput,
    ): Promise<CreateBiomeUseCaseOutput> {
        const useCaseInput = new CreateBiomeUseCaseInput({
            ...input,
        });
        return await this.newBiomeUseCase.run(useCaseInput);
    }

    @Put(':id')
    @Roles(RolesEnum.Admin)
    @ApiOperation({ summary: 'Update Biome By Id' })
    @ApiResponse({ status: HttpStatus.OK, type: UpdateBiomeUseCaseOutput })
    async updateBiome(
        @Body() input: UpdateBiomeRequestInput,
        @Param('id', ParseIntPipe) id: number,
    ): Promise<UpdateBiomeUseCaseOutput> {
        const useCaseInput = new UpdateBiomeUseCaseInput({
            id,
            name: input.name
        });
        return await this.updateBiomeUseCase.run(useCaseInput);
    }

    @Get(':id')
    @Roles(RolesEnum.Admin)
    @ApiOperation({ summary: 'Get Biome By Id' })
    @ApiResponse({ status: HttpStatus.OK, type: GetBiomeByIdUseCaseOutput })
    async getBiomeById(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<GetBiomeByIdUseCaseOutput> {
        const useCaseInput = new GetBiomeByIdUseCaseInput({
            id,
        });
        return await this.getBiomeByIdUseCase.run(useCaseInput);
    }
}
