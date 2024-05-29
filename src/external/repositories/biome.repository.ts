import { Injectable } from "@nestjs/common";
import { IBiomeRepository } from "../../domain/interfaces/repositories/biome.repository.interface";
import { Biome } from "../../domain/entities/biome";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import BaseRepository from "./base.repository";

@Injectable()
export default class BiomeRepository
    extends BaseRepository<Biome>
    implements IBiomeRepository
{
 constructor(
    @InjectRepository(Biome)
    private readonly biomeRepository: Repository<Biome>,
 )  {
    super(biomeRepository);
 }
}