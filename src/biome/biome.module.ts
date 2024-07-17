import { Module } from '@nestjs/common';
import { BiomeController } from './controller/biome.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Biome } from '../domain/entities/biome';
import {
  BiomeRepositoryToken,
  CreateBiomeUseCaseToken,
  GetBiomeByIdUseCaseToken,
  UpdateBiomeUseCaseToken,
} from './biome.token';
import BiomeRepository from '../external/repositories/biome.repository';
import UpdateBiomeUseCase from './usecases/update.biome.usecase';
import GetBiomeByIdUseCase from './usecases/get.biome.by.id.usecase';
import CreateBiomeUseCase from './usecases/create.biome.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([Biome])],
  providers: [
    {
      provide: BiomeRepositoryToken,
      useClass: BiomeRepository,
    },
    {
      provide: CreateBiomeUseCaseToken,
      useClass: CreateBiomeUseCase,
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
