import { Inject, Injectable, Logger } from "@nestjs/common";
import IUseCase from "../../domain/interfaces/usecase/IUseCase";
import GetBiomeByIdUseCaseInput from "./dtos/get.biome.by.id.usecase.input";
import GetBiomeByIdUseCaseOutput from "./dtos/get.biome.by.id.usecase.output";
import { IBiomeRepository } from "../../domain/interfaces/repositories/biome.repository.interface";
import BiomeNotFoundError from "../../core/error/biome.not.found.error";
import { BiomeRepositoryToken, GetBiomeByIdUseCaseToken } from "../biome.token";

@Injectable()
export default class GetBiomeByIdUseCase implements IUseCase<GetBiomeByIdUseCaseInput, GetBiomeByIdUseCaseOutput> {
    private readonly logger = new Logger(GetBiomeByIdUseCase.name);
    
    constructor(
        @Inject(BiomeRepositoryToken)
        private readonly biomeRepository: IBiomeRepository,
    ) {}

    async run(input: GetBiomeByIdUseCaseInput): Promise<GetBiomeByIdUseCaseOutput> {
        this.logger.log('Starting')

        const biome = await this.biomeRepository.findOne({ where: { id: input.id } });

        if (!biome) {
            throw new BiomeNotFoundError();
        };

        return biome

    }
} 
