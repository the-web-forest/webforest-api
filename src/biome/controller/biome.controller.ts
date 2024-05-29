import { Body, Controller, Inject, Post } from '@nestjs/common';
import { RolesEnum } from '../../auth/enums/roles';
import { Roles } from '../../auth/decorators/role.decorator';
import NewBiomeControllerInput from './dto/new.biome.controller.input';
import { NewBiomeUseCaseToken } from '../biome.token';
import IUseCase from '../../domain/interfaces/usecase/IUseCase';
import NewBiomeUseCaseInput from '../usecases/dtos/new.biome.usecase.input';
import NewBiomeUseCaseOutput from '../usecases/dtos/new.biome.usecase.output';


@Controller('biome')
export class BiomeController {

    constructor(
        @Inject(NewBiomeUseCaseToken)
        private readonly newBiomeUseCase:IUseCase<NewBiomeUseCaseInput, NewBiomeUseCaseOutput>
    ){}
    
    @Post()
    @Roles(RolesEnum.Admin)
    async createBiome(@Body() input: NewBiomeControllerInput){
        const useCaseInput = new NewBiomeUseCaseInput({
            name: input.name
        })
        return await this.newBiomeUseCase.run(useCaseInput)
    }
}
