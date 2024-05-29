import { Module } from '@nestjs/common';
import { BiomeController } from './controller/biome.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Biome } from '../domain/entities/biome';
import { BiomeRepositoryToken, NewBiomeUseCaseToken} from './biome.token';
import BiomeRepository from '../external/repositories/biome.repository';
import NewBiomeUseCase from './usecases/new.biome.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([Biome])],
  providers: [
    {
      provide: BiomeRepositoryToken, 
      useClass: BiomeRepository
    },
    {
      provide: NewBiomeUseCaseToken,
      useClass: NewBiomeUseCase,
    },
  ],
  controllers: [BiomeController]
})
export class BiomeModule {}
