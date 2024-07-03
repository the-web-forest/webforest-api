import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Logger,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import CreateVolunteerControllerInput from './dtos/create.volunteer.controller.input';
import { Roles } from '../../auth/decorators/role.decorator';
import { RolesEnum } from '../../auth/enums/roles';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import CreateVolunteerControllerOutput from './dtos/create.volunteer.controller.output';
import {
  CreateVolunteerUseCaseToken,
  GetVolunteerByIdUseCaseToken,
  ListVolunteersUseCaseToken,
  UpdateVolunteerUseCaseToken,
} from '../volunteer.tokens';
import IUseCase from '../../domain/interfaces/usecase/IUseCase';
import CreateVolunteerUseCaseInput from '../usecases/dtos/create.volunteer.usecase.input';
import CreateVolunteerUseCaseOutput from '../usecases/dtos/create.volunteer.usecase.output';
import UpdateVolunteerControllerInput from './dtos/update.volunteer.controller.input';
import UpdateVolunteerControllerOutput from './dtos/update.volunteer.controller.output';
import UpdateVolunteerUseCaseInput from '../usecases/dtos/update.volunteer.usecase.input';
import UpdateVolunteerUseCaseOutput from '../usecases/dtos/update.volunteer.usecase.output';
import GetVolunteerByIdUsecaseOutput from './dtos/get.volunteer.by.id.output';
import GetVolunteerByIdUseCaseInput from './dtos/get.volunteer.by.id.usecase.input';
import { Public } from '../../auth/decorators/public.decorator';
import ListVolunteersOutput from './dtos/list.volunteers.output';
import ListVolunteersUseCaseInput from '../usecases/dtos/list.volunteers.usecase.input';
import ListVolunteersUseCaseOutput from '../usecases/dtos/list.volunteers.usecase.output';
import ListVolunteersInput from './dtos/list.volunteers.input';

@Controller('volunteer')
@ApiTags('Volunteer')
export class VolunteerController {
  private readonly logger = new Logger(VolunteerController.name);

  constructor(
    @Inject(CreateVolunteerUseCaseToken)
    private readonly createVolunteerUseCase: IUseCase<
      CreateVolunteerUseCaseInput,
      CreateVolunteerUseCaseOutput
    >,

    @Inject(UpdateVolunteerUseCaseToken)
    private readonly updateVolunteerUseCase: IUseCase<
      UpdateVolunteerUseCaseInput,
      UpdateVolunteerUseCaseOutput
    >,

    @Inject(GetVolunteerByIdUseCaseToken)
    private readonly getVolunteerByIdUseCase: IUseCase<
      GetVolunteerByIdUseCaseInput,
      GetVolunteerByIdUsecaseOutput
    >,

    @Inject(ListVolunteersUseCaseToken)
    private readonly listVolunteersUseCase: IUseCase<
      ListVolunteersUseCaseInput,
      ListVolunteersUseCaseOutput
    >,
  ) {}

  @Post()
  @Roles(RolesEnum.Admin)
  @ApiOperation({ summary: 'Create Volunteer' })
  @ApiResponse({ status: HttpStatus.OK, type: CreateVolunteerControllerOutput })
  async create(
    @Body() input: CreateVolunteerControllerInput,
  ): Promise<CreateVolunteerControllerOutput> {
    this.logger.log('create', { ...input });
    const useCaseInput = new CreateVolunteerUseCaseInput({ ...input });
    return await this.createVolunteerUseCase.run(useCaseInput);
  }

  @Put(':id')
  @Roles(RolesEnum.Admin)
  @ApiOperation({ summary: 'Update Volunteer' })
  @ApiResponse({ status: HttpStatus.OK, type: UpdateVolunteerControllerOutput })
  async update(
    @Body() input: UpdateVolunteerControllerInput,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UpdateVolunteerControllerOutput> {
    this.logger.log('update', { ...input, id });
    const useCaseInput = new UpdateVolunteerUseCaseInput({ ...input, id });
    return await this.updateVolunteerUseCase.run(useCaseInput);
  }

  @Get('/list')
  @Public()
  @ApiOperation({ summary: 'Get Volunteers' })
  @ApiResponse({ status: HttpStatus.OK, type: ListVolunteersOutput })
  async getTopVolunteerByQuantity(
    @Query() query: ListVolunteersInput,
  ): Promise<ListVolunteersOutput> {
    const useCaseInput = new ListVolunteersUseCaseInput({
      ...query,
    });
    return await this.listVolunteersUseCase.run(useCaseInput);
  }

  @Get(':id')
  @Roles(RolesEnum.Admin)
  @ApiOperation({ summary: 'Get Volunteer By Id' })
  @ApiResponse({ status: HttpStatus.OK, type: GetVolunteerByIdUsecaseOutput })
  async GetVolunteerByIdUseCaseInput(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<GetVolunteerByIdUsecaseOutput> {
    const useCaseInput = new GetVolunteerByIdUseCaseInput({
      id,
    });
    return await this.getVolunteerByIdUseCase.run(useCaseInput);
  }
}
