import { Body, Controller, Inject, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { RolesEnum } from '../../auth/enums/roles';
import { Roles } from '../../auth/decorators/role.decorator';
import NewBiomeControllerInput from './dto/new.biome.controller.input';
import { NewBiomeUseCaseToken, UpdateBiomeUseCaseToken } from '../biome.token';
import IUseCase from '../../domain/interfaces/usecase/IUseCase';
import NewBiomeUseCaseInput from '../usecases/dtos/new.biome.usecase.input';
import NewBiomeUseCaseOutput from '../usecases/dtos/new.biome.usecase.output';
import BiomeUpdateRequestInput from './dto/biome.update.request.input';
import UpdateBiomeUseCase from '../usecases/update.biome.usecase';
import UpdateBiomeUseCaseInput from '../usecases/dtos/update.biome.usecase.input';
import UpdateBiomeUseCaseOutput from '../usecases/dtos/update.biome.usecase.output';


@Controller('biome')
export class BiomeController {

    constructor(
        @Inject(NewBiomeUseCaseToken)
        private readonly newBiomeUseCase:IUseCase<NewBiomeUseCaseInput, NewBiomeUseCaseOutput>,

        @Inject(UpdateBiomeUseCaseToken)
        private readonly updateBiomeUseCase:IUseCase<UpdateBiomeUseCaseInput,UpdateBiomeUseCaseOutput>
    ){}
    
    @Post()
    @Roles(RolesEnum.Admin)
    async createBiome(@Body() input: NewBiomeControllerInput){
        const useCaseInput = new NewBiomeUseCaseInput({
            name: input.name
        })
        return await this.newBiomeUseCase.run(useCaseInput)
    }

    @Put(':id')
    async updateBiome(@Body() input: BiomeUpdateRequestInput, @Param('id', ParseIntPipe) id:number){
        const useCaseInput = new UpdateBiomeUseCaseInput({
            id,
            name: input.name
        })
        return await this.updateBiomeUseCase.run(useCaseInput)
    }
}
