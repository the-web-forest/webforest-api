import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { NewUserControllerInput } from './dto/new.user.controller.input';
import { validate } from 'class-validator';
import { CreateUserUseCaseToken } from '../user.tokens';
import CreateUserUseCaseOutput from '../usecases/dtos/create.user.usecase.output';

describe('UserController', () => {
  let controller: UserController;
  const input = new NewUserControllerInput()
  
  beforeEach(async () => {

    const useCaseResponse = new CreateUserUseCaseOutput()

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

  it('should be called', async () => {
    const response = await controller.createUser(input);
    expect(response).toBeNull();
  });
});
