import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Logger,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { NewUserControllerInput } from './dto/new.user.controller.input';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import NewUserControllerOutput from './dto/new.user.controller.output';
import { Public } from '../../auth/decorators/public.decorator';
import IUseCase from 'src/domain/interfaces/usecase/IUseCase';
import {
  CreateUserUseCaseToken,
  SendUserActivationEmailUseCaseToken,
  UpdateUserUseCaseToken,
  UserLoginUseCaseToken,
  ValidateUserActivationEmailUseCaseToken,
} from '../user.tokens';
import CreateUserUseCaseInput from '../usecases/dtos/create.user.usecase.input';
import CreateUserUseCaseOutput from '../usecases/dtos/create.user.usecase.output';
import { SendUserActivationRequestInput } from './dto/send.user.activation.request.input';
import { SendUserActivationRequestOutput } from './dto/send.user.activation.request.output';
import SendUserActivationEmailUseCaseInput from '../usecases/dtos/send.user.activation.email.usecase.input';
import SendUserActivationEmailUseCaseOutput from '../usecases/dtos/send.user.activation.email.usecase.output';
import { ValidateUserActivationRequestInput } from './dto/validate.user.activation.request.input';
import { ValidateUserActivationRequestOutput } from './dto/validate.user.activation.request.output';
import ValidateUserActivationEmailUseCaseInput from '../usecases/dtos/validate.user.activation.email.usecase.input';
import ValidateUserActivationEmailUseCaseOutput from '../usecases/dtos/validate.user.activation.email.usecase.output';
import UserLoginRequestInput from './dto/user.login.request.input';
import UserLoginRequestOutput from './dto/user.login.request.output';
import UserLoginUseCaseInput from '../usecases/dtos/user.login.usecase.input';
import UserLoginUseCaseOutput from '../usecases/dtos/user.login.usecase.output';
import { User } from '../../domain/entities/user';
import UserUpdateRequestInput from './dto/user.update.request.input';
import UpdateUserUseCaseInput from '../usecases/dtos/update.user.usecase.input';
import UpdateUserUseCaseOutput from '../usecases/dtos/update.user.usecase.output';
import UserUpdateRequestOutput from './dto/user.update.request.output';
@Controller('user')
@ApiTags('User')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(
    @Inject(CreateUserUseCaseToken)
    private readonly createUserUseCase: IUseCase<
      CreateUserUseCaseInput,
      CreateUserUseCaseOutput
    >,

    @Inject(SendUserActivationEmailUseCaseToken)
    private readonly sendUserActivationEmailUseCase: IUseCase<
      SendUserActivationEmailUseCaseInput,
      SendUserActivationEmailUseCaseOutput
    >,

    @Inject(ValidateUserActivationEmailUseCaseToken)
    private readonly validateUserActivationEmailUseCase: IUseCase<
      ValidateUserActivationEmailUseCaseInput,
      ValidateUserActivationEmailUseCaseOutput
    >,

    @Inject(UserLoginUseCaseToken)
    private readonly userLogerUseCase: IUseCase<
      UserLoginUseCaseInput,
      UserLoginUseCaseOutput
    >,

    @Inject(UpdateUserUseCaseToken)
    private readonly updateUserUseCase: IUseCase<UpdateUserUseCaseInput, UpdateUserUseCaseOutput>
  ) { }

  @Post()
  @Public()
  @ApiOperation({ summary: 'Create a User' })
  @ApiResponse({ status: HttpStatus.OK, type: NewUserControllerOutput })
  async createUser(
    @Body() input: NewUserControllerInput,
  ): Promise<NewUserControllerOutput> {
    this.logger.log('Creating a new user with this data', {
      ...input,
      password: '????',
    });
    const useCaseInput = new CreateUserUseCaseInput({
      ...input,
    });
    const response = await this.createUserUseCase.run(useCaseInput);
    return NewUserControllerOutput.fromUseCaseResponse(response);
  }

  @Post('activation/email/send')
  @Public()
  @ApiOperation({ summary: 'Send Activation Request E-mail' })
  @ApiResponse({ status: HttpStatus.OK, type: SendUserActivationRequestOutput })
  async sendActivationRequestEmail(
    @Body() input: SendUserActivationRequestInput,
  ): Promise<SendUserActivationRequestOutput> {
    this.logger.log('Creating a new activation user e-mail request', {
      ...input,
    });
    const useCaseInput = new SendUserActivationEmailUseCaseInput({
      email: input.email,
    });
    const response =
      await this.sendUserActivationEmailUseCase.run(useCaseInput);
    return SendUserActivationRequestOutput.fromUseCaseResponse(response) as any;
  }

  @Post('activation/email/validate')
  @Public()
  @ApiOperation({ summary: 'Send Activation Request E-mail' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: ValidateUserActivationRequestOutput,
  })
  async validateActivationRequestEmail(
    @Body() input: ValidateUserActivationRequestInput,
  ): Promise<ValidateUserActivationRequestOutput> {
    this.logger.log('Validating a new activation user e-mail request', {
      ...input,
    });
    const useCaseInput = new ValidateUserActivationEmailUseCaseInput({
      hash: input.hash,
    });
    const response =
      await this.validateUserActivationEmailUseCase.run(useCaseInput);
    return ValidateUserActivationRequestOutput.fromUseCaseResponse(response);
  }

  @Post('login')
  @Public()
  @ApiOperation({ summary: 'User Login' })
  @ApiResponse({ status: HttpStatus.OK, type: UserLoginRequestOutput })
  async login(
    @Body() input: UserLoginRequestInput,
  ): Promise<UserLoginRequestOutput> {
    this.logger.log('User login with this data', {
      ...input,
      password: '????',
    });
    const useCaseInput = new UserLoginUseCaseInput({
      ...input,
    });
    const response = await this.userLogerUseCase.run(useCaseInput);
    return UserLoginRequestOutput.fromUseCaseResponse(response);
  }

  @Patch()
  @ApiOperation({ summary: 'User Self Update' })
  @ApiResponse({ status: HttpStatus.OK, type: UserUpdateRequestOutput })
  async updateUserProfile(@Body() input: UserUpdateRequestInput, @Req() request: { user: User }): Promise<UserUpdateRequestOutput> {
    this.logger.log(`User ${request.user.email} is self updating with this data`, { ...input })
    const useCaseInput = new UpdateUserUseCaseInput({
      firstName: input.firstName,
      lastName: input.lastName,
      password: input.password,
      nickName: input.nickName,
      id: request.user.id
    });
    const response = await this.updateUserUseCase.run(useCaseInput);
    return UserUpdateRequestOutput.fromUseCaseResponse(response);
  }
}
