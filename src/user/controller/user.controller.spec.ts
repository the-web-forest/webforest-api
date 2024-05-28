import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { NewUserControllerInput } from './dto/new.user.controller.input';
import { CreateUserUseCaseToken, SendUserActivationEmailUseCaseToken } from '../user.tokens';
import CreateUserUseCaseOutput from '../usecases/dtos/create.user.usecase.output';
import SendUserActivationEmailUseCase from '../usecases/send.user.activation.email.usecase';
import SendUserActivationEmailUseCaseOutput from '../usecases/dtos/send.user.activation.email.usecase.output';

describe('UserController', () => {
  let controller: UserController;

  const input = new NewUserControllerInput()
  const createUserUseCaseResponse = new CreateUserUseCaseOutput({
    id: 1,
    firstName: 'Matheus'
  })
  
  const sendUserActivationEmailUseCaseResponse = new SendUserActivationEmailUseCaseOutput({
    email: "mdbf42@gmail.com",
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
        }
      ]
    }).compile();
    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call usecase.run', async () => {
    const constrollerResponse = await controller.createUser(input);
    expect(constrollerResponse).toStrictEqual(createUserUseCaseResponse);
  });

});
