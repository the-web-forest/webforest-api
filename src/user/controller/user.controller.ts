import { Body, Controller, Inject, Logger, Post } from '@nestjs/common';
import { NewUserControllerInput } from './dto/new.user.controller.input';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import NewUserControllerOutput from './dto/new.user.controller.output';
import { Public } from '../../auth/decorators/public.decorator';
import IUseCase from 'src/domain/interfaces/usecase/IUseCase';
import { CreateUserUseCaseToken } from '../user.tokens';
import CreateUserUseCaseInput from '../usecases/dtos/create.user.usecase.input';
import CreateUserUseCaseOutput from '../usecases/dtos/create.user.usecase.output';

@Controller('user')
@ApiTags('User')
export class UserController {
    private readonly logger = new Logger(UserController.name);

    constructor(
        @Inject(CreateUserUseCaseToken)
        private readonly createUserUseCase: IUseCase<CreateUserUseCaseInput, CreateUserUseCaseOutput>
    ) { }

    @Post()
    @Public()
    @ApiOperation({ summary: 'Create a User' })
    @ApiResponse({ type: NewUserControllerOutput })
    async createUser(@Body() input: NewUserControllerInput): Promise<NewUserControllerOutput> {
        this.logger.log('Creating a new user with this data', { ...input, password: '????' })
        return Promise.resolve(null)
    }

}
