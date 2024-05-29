import { Body, Controller, Post } from '@nestjs/common';
import { RolesEnum } from '../../auth/enums/roles';
import { Roles } from '../../auth/decorators/role.decorator';
import NewBiomeControllerInput from './dto/new.biome.controller.input';


@Controller('biome')
export class BiomeController {

    @Post()
    @Roles(RolesEnum.Admin)
    async createBiome(@Body() input: NewBiomeControllerInput){
        return input
    }
}
