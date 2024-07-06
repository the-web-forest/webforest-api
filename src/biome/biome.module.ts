import { Module } from '@nestjs/common';
import { BiomeController } from './controller/biome.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Biome } from '../domain/entities/biome';
import {
  BiomeRepositoryToken,
  GetBiomeByIdUseCaseToken,
  NewBiomeUseCaseToken,
  UpdateBiomeUseCaseToken,
} from './biome.token';
import BiomeRepository from '../external/repositories/biome.repository';
import NewBiomeUseCase from './usecases/new.biome.usecase';
import UpdateBiomeUseCase from './usecases/update.biome.usecase';
import GetBiomeByIdUseCase from './usecases/get.biome.by.id.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([Biome])],
  providers: [
    {
      provide: BiomeRepositoryToken,
      useClass: BiomeRepository,
    },
    {
      provide: NewBiomeUseCaseToken,
      useClass: NewBiomeUseCase,
    },
    {
      provide: UpdateBiomeUseCaseToken,
      useClass: UpdateBiomeUseCase,
    },
    {
      provide: GetBiomeByIdUseCaseToken,
      useClass: GetBiomeByIdUseCase,
    },
  ],
  controllers: [BiomeController],
})
export class BiomeModule {}
