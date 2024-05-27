import { Body, Controller, Inject, Logger, Post, UseInterceptors } from '@nestjs/common';
import { NewUserControllerInput } from './dto/new.user.controller.input';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import NewUserControllerOutput from './dto/new.user.controller.output';
import { Public } from '../../auth/decorators/public.decorator';
import IUseCase from 'src/domain/interfaces/usecase/IUseCase';
import { CreateUserUseCaseToken, SendUserActivationEmailUseCaseToken } from '../user.tokens';
import CreateUserUseCaseInput from '../usecases/dtos/create.user.usecase.input';
import CreateUserUseCaseOutput from '../usecases/dtos/create.user.usecase.output';
import ErrorsInterceptor from 'src/interceptors/error.interceptor';
import { SendUserActivationRequestInput } from './dto/send.user.activation.request.input';
import { SendUserActivationRequestOutput } from './dto/send.user.activation.request.output';
import SendUserActivationEmailUseCaseInput from '../usecases/dtos/send.user.activation.email.usecase.input';
import SendUserActivationEmailUseCaseOutput from '../usecases/dtos/send.user.activation.email.usecase.output';

@Controller('user')
@ApiTags('User')
export class UserController {
    private readonly logger = new Logger(UserController.name);

    constructor(
        @Inject(CreateUserUseCaseToken)
        private readonly createUserUseCase: IUseCase<CreateUserUseCaseInput, CreateUserUseCaseOutput>,

        @Inject(SendUserActivationEmailUseCaseToken)
        private readonly sendUserActivationEmailUseCase: IUseCase<SendUserActivationEmailUseCaseInput, SendUserActivationEmailUseCaseOutput>
    ) { }

    @Post()
    @Public()
    @ApiOperation({ summary: 'Create a User' })
    @ApiResponse({ type: NewUserControllerOutput })
    async createUser(@Body() input: NewUserControllerInput): Promise<NewUserControllerOutput> {
        this.logger.log('Creating a new user with this data', { ...input, password: '????' })
        const useCaseInput = new CreateUserUseCaseInput({
            ...input
        })
        const response = await this.createUserUseCase.run(useCaseInput)
        return NewUserControllerOutput.fromUseCaseResponse(response)
    }

    @Post('activation/email/send')
    @Public()
    @ApiOperation({ summary: 'Send Activation Request E-mail' })
    @ApiResponse({ type: SendUserActivationRequestOutput })
    async sendActivationRequestEmail(@Body() input: SendUserActivationRequestInput): Promise<SendUserActivationRequestOutput> {
        this.logger.log('Creating a new user with this data', { ...input, password: '????' })
        const useCaseInput = new SendUserActivationEmailUseCaseInput({
            email: input.email
        })
        const response = await this.sendUserActivationEmailUseCase.run(useCaseInput)
        return SendUserActivationRequestOutput.fromUseCaseResponse(response) as any
    }

}
