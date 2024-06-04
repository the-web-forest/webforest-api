import { Body, Controller, Post } from '@nestjs/common';
import CreateVolunteerControllerInput from './dtos/create.volunteer.controller.input';
import { Roles } from '../../auth/decorators/role.decorator';
import { RolesEnum } from '../../auth/enums/roles';
import { ApiTags } from '@nestjs/swagger';

@Controller('volunteer')
@ApiTags('Volunteer')
export class VolunteerController {

    @Post()
    @Roles(RolesEnum.Admin)
    async create(@Body() input: CreateVolunteerControllerInput) {

    }

}
