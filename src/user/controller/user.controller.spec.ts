import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { NewUserControllerInput } from './dto/new.user.controller.input';
import { CreateUserUseCaseToken } from '../user.tokens';
import CreateUserUseCaseOutput from '../usecases/dtos/create.user.usecase.output';

describe('UserController', () => {
  let controller: UserController;
  const input = new NewUserControllerInput()
  const useCaseResponse = new CreateUserUseCaseOutput({
    id: 1,
    firstName: 'Matheus'
  })
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: CreateUserUseCaseToken,
          useValue: {
            run: jest.fn().mockReturnValue(useCaseResponse)
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
    expect(constrollerResponse).toStrictEqual(useCaseResponse);
  });

});
