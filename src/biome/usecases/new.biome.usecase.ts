import IUseCase from "../../domain/interfaces/usecase/IUseCase";
import NewBiomeUseCaseInput from "./dtos/new.biome.usecase.input";
import NewBiomeUseCaseOutput from "./dtos/new.biome.usecase.output";

export default class NewBiomeUseCase implements IUseCase<NewBiomeUseCaseInput, NewBiomeUseCaseOutput>{
    run(input: NewBiomeUseCaseInput): Promise<NewBiomeUseCaseOutput> {
        throw new Error("Method not implemented.");
    }

}