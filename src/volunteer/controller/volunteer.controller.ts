import { Body, Controller, Post } from '@nestjs/common';
import CreateVolunteerControllerInput from './dtos/create.volunteer.controller.input';

@Controller('volunteer')
export class VolunteerController {

    @Post()
    async create(@Body() input: CreateVolunteerControllerInput) {
        
    }

}
