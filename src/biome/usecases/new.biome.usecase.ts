import { Inject } from "@nestjs/common";
import IUseCase from "../../domain/interfaces/usecase/IUseCase";
import { BiomeRepositoryToken } from "../biome.token";
import NewBiomeUseCaseInput from "./dtos/new.biome.usecase.input";
import NewBiomeUseCaseOutput from "./dtos/new.biome.usecase.output";
import { IBiomeRepository } from "../../domain/interfaces/repositories/biome.repository.interface";
import BiomeAlreadyRegisteredError from "../../core/error/biome.already.registered.error";

export default class NewBiomeUseCase implements IUseCase<NewBiomeUseCaseInput, NewBiomeUseCaseOutput>{
   
    constructor(
        @Inject(BiomeRepositoryToken)
        private readonly biomeRepository: IBiomeRepository
    ){}

    async run(input: NewBiomeUseCaseInput): Promise<NewBiomeUseCaseOutput> {
        const biome = await this.biomeRepository.findOne({ where: { name: input.name }})

        if(biome){
            throw new BiomeAlreadyRegisteredError()
        }

        return await this.biomeRepository.save({
            name: input.name,
            createdAt: new Date(),
            updatedAt: new Date(),
        })
    }

}