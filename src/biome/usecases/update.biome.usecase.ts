import { Inject, Logger } from "@nestjs/common";
import IUseCase from "../../domain/interfaces/usecase/IUseCase";
import UpdateBiomeUseCaseInput from "./dtos/update.biome.usecase.input";
import { BiomeRepositoryToken } from "../biome.token";
import { IBiomeRepository } from "../../domain/interfaces/repositories/biome.repository.interface";
import UpdateBiomeUseCaseOutput from "./dtos/update.biome.usecase.output";
import { Biome } from "../../domain/entities/biome";
import BiomeNotFoundError from "../../core/error/biome.not.found.error";
import { Not } from "typeorm";
import BiomeAlreadyRegisteredError from "../../core/error/biome.already.registered.error";

export default class UpdateBiomeUseCase
    implements IUseCase<UpdateBiomeUseCaseInput, UpdateBiomeUseCaseOutput> {
    private readonly logger = new Logger(UpdateBiomeUseCase.name);
    constructor(
        @Inject(BiomeRepositoryToken)
        private readonly biomeRepository: IBiomeRepository,
    ) { }

    async run(input: UpdateBiomeUseCaseInput): Promise<UpdateBiomeUseCaseOutput> {
        const biome = await this.biomeRepository.findOne({});

        if (!biome) {
            throw new BiomeNotFoundError();
        }
        const newBiome = await this.update(input, biome);
        return UpdateBiomeUseCaseOutput.fromBiome(newBiome);
    }

    private async update(input: UpdateBiomeUseCaseInput, biome: Biome): Promise<Biome> {

        Object.assign(biome, input);

        if (input.name) {
            this.logger.log('Updating bioma name')
            const nameIsAlreadyRegistered = await this.biomeRepository.findOne({ where: { name: input.name, id: Not(biome.id) } })
        
            if(nameIsAlreadyRegistered){
                this.logger.warn(`Name ${nameIsAlreadyRegistered.name} is already registered`)
                throw new BiomeAlreadyRegisteredError()
            }

            this.logger.log(`Name ${input.name} is free to use`)
            
        }

        biome.updatedAt = new Date()

        return await biome.save();
    }
}