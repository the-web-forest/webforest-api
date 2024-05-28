import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { NewUserControllerInput } from './dto/new.user.controller.input';
import { CreateUserUseCaseToken, SendUserActivationEmailUseCaseToken, ValidateUserActivationEmailUseCaseToken } from '../user.tokens';
import CreateUserUseCaseOutput from '../usecases/dtos/create.user.usecase.output';
import SendUserActivationEmailUseCaseOutput from '../usecases/dtos/send.user.activation.email.usecase.output';
import { SendUserActivationRequestInput } from './dto/send.user.activation.request.input';
import { SendUserActivationRequestOutput } from './dto/send.user.activation.request.output';
import ValidateUserActivationEmailUseCase from '../usecases/validate.user.activation.email.usecase';
import { ValidateUserActivationRequestInput } from './dto/validate.user.activation.request.input';
import ValidateUserActivationEmailUseCaseOutput from '../usecases/dtos/validate.user.activation.email.usecase.output';
import { ValidateUserActivationRequestOutput } from './dto/validate.user.activation.request.output';

describe('UserController', () => {
  let controller: UserController;

  const createUserUseCaseResponse = new CreateUserUseCaseOutput({
    id: 1,
    firstName: 'Matheus'
  })

  const sendUserActivationEmailUseCaseResponse = new SendUserActivationEmailUseCaseOutput({
    email: "mdbf42@gmail.com",
    processedAt: new Date()
  })

  const validateUserActivationEmailUseCaseResponse = new ValidateUserActivationEmailUseCaseOutput({
    email: "mdbf43@gmail.com",
    processedAt: new Date()
  })

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: CreateUserUseCaseToken,
          useValue: {
            run: jest.fn().mockReturnValue(createUserUseCaseResponse)
          }
        },
        {
          provide: SendUserActivationEmailUseCaseToken,
          useValue: {
            run: jest.fn().mockReturnValue(sendUserActivationEmailUseCaseResponse)
          }
        }, {
          provide: ValidateUserActivationEmailUseCaseToken,
          useValue: {
            run: jest.fn().mockReturnValue(validateUserActivationEmailUseCaseResponse)
          }
        }
      ]
    }).compile();
    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call usecase.run on createUser', async () => {
    const input = new NewUserControllerInput()
    const constrollerResponse = await controller.createUser(input);
    expect(constrollerResponse).toStrictEqual(createUserUseCaseResponse);
  });

  it('should call usecase.run on sendActivationRequestEmail', async () => {
    const input = new SendUserActivationRequestInput()
    const controllerResponse = await controller.sendActivationRequestEmail(input);
    expect(controllerResponse).toBeInstanceOf(SendUserActivationRequestOutput);
    expect(controllerResponse.email).toBe(sendUserActivationEmailUseCaseResponse.email)
    expect(controllerResponse.processedAt).toBe(sendUserActivationEmailUseCaseResponse.processedAt)
    expect(controllerResponse).toBeInstanceOf(SendUserActivationRequestOutput)

  });

  it('should call usecase.run on validateActivationRequestEmail', async () => {
    const input = new ValidateUserActivationRequestInput()
    const controllerResponse = await controller.validateActivationRequestEmail(input);
    expect(controllerResponse.email).toBe(validateUserActivationEmailUseCaseResponse.email)
    expect(controllerResponse.processedAt).toBe(validateUserActivationEmailUseCaseResponse.processedAt)
    expect(controllerResponse).toBeInstanceOf(ValidateUserActivationRequestOutput)
  });

});
