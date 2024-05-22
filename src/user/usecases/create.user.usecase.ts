import IUseCase from "src/domain/interfaces/usecase/IUseCase";
import CreateUserUseCaseInput from "./dtos/create.user.usecase.input";
import CreateUserUseCaseOutput from "./dtos/create.user.usecase.output";

export default class CreateUserUseCase implements IUseCase<CreateUserUseCaseInput, CreateUserUseCaseOutput> {
    run(input: CreateUserUseCaseInput): Promise<CreateUserUseCaseOutput> {
        throw new Error("Method not implemented.");
    }
}