import { Repository } from 'typeorm';
import { Biome } from '../../entities/biome';

export interface IBiomeRepository extends Repository<Biome> {}
