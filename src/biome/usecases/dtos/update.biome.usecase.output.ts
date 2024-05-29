import PartialClass from "../../../domain/base/partial.class";
import { Biome } from "../../../domain/entities/biome";

export default class UpdateBiomeUseCaseOutput extends PartialClass {
    id: number;
    name: string;
    UpdatedAt: Date;

    static fromBiome(biome: Biome): UpdateBiomeUseCaseOutput {
        return new UpdateBiomeUseCaseOutput ({
            name: biome.name,
            updatedAt: biome.updatedAt
        })
    }
}