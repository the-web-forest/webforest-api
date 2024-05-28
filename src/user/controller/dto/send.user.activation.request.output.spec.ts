import SendUserActivationEmailUseCaseOutput from "../../usecases/dtos/send.user.activation.email.usecase.output";
import { SendUserActivationRequestOutput } from "./send.user.activation.request.output";

describe('SendUserActivationRequestOutput', () => {
  const entity: SendUserActivationRequestOutput = new SendUserActivationRequestOutput({
    email: 'mdbf42@gmail.com',
    processedAt: new Date()
  });

  it('should be defined', () => {
    expect(entity).toBeDefined();
  });

  it('should be instanced from usecase response', () => {
    const useCaseResponse = new SendUserActivationEmailUseCaseOutput({
      email: 'mdbf42@gmail.com',
      processedAt: new Date()
    })

    expect(SendUserActivationRequestOutput.fromUseCaseResponse(useCaseResponse)).toBeDefined();
    expect(SendUserActivationRequestOutput.fromUseCaseResponse(useCaseResponse)).toBeInstanceOf(SendUserActivationRequestOutput);
  });

});
