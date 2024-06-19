import { BadRequestException, Body, Controller, Get, Inject, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { RolesEnum } from '../../auth/enums/roles';
import { Roles } from '../../auth/decorators/role.decorator';
import NewBiomeControllerInput from './dto/new.biome.controller.input';
import { GetBiomeByIdUseCaseToken, NewBiomeUseCaseToken, UpdateBiomeUseCaseToken } from '../biome.token';
import IUseCase from '../../domain/interfaces/usecase/IUseCase';
import NewBiomeUseCaseInput from '../usecases/dtos/new.biome.usecase.input';
import NewBiomeUseCaseOutput from '../usecases/dtos/new.biome.usecase.output';
import BiomeUpdateRequestInput from './dto/biome.update.request.input';
import UpdateBiomeUseCaseInput from '../usecases/dtos/update.biome.usecase.input';
import UpdateBiomeUseCaseOutput from '../usecases/dtos/update.biome.usecase.output';
import GetBiomeByIdUseCaseOutput from '../usecases/dtos/get.biome.by.id.usecase.output';
import GetBiomeByIdUseCaseInput from '../usecases/dtos/get.biome.by.id.usecase.input';


@Controller('biome')
export class BiomeController {

    constructor(
        @Inject(NewBiomeUseCaseToken)
        private readonly newBiomeUseCase: IUseCase<NewBiomeUseCaseInput, NewBiomeUseCaseOutput>,

        @Inject(UpdateBiomeUseCaseToken)
        private readonly updateBiomeUseCase: IUseCase<UpdateBiomeUseCaseInput, UpdateBiomeUseCaseOutput>,

        @Inject(GetBiomeByIdUseCaseToken)
        private readonly getBiomeByIdUseCase: IUseCase<GetBiomeByIdUseCaseInput, GetBiomeByIdUseCaseOutput>
    ) { }

    @Post()
    @Roles(RolesEnum.Admin)
    async createBiome(@Body() input: NewBiomeControllerInput) {
        const useCaseInput = new NewBiomeUseCaseInput({
            ...input
        })
        return await this.newBiomeUseCase.run(useCaseInput)
    }

    @Put(':id')
    async updateBiome(@Body() input: BiomeUpdateRequestInput, @Param('id', ParseIntPipe) id: number) {
        const useCaseInput = new UpdateBiomeUseCaseInput({
            id,
            name: input.name
        })
        return await this.updateBiomeUseCase.run(useCaseInput)
    }
    @Get(':id')
    async getBiomeById(@Param('id', ParseIntPipe) id: number): Promise<GetBiomeByIdUseCaseOutput> {
        const useCaseInput = new GetBiomeByIdUseCaseInput({
            id
        })
        return await this.getBiomeByIdUseCase.run(useCaseInput)

    }
}

