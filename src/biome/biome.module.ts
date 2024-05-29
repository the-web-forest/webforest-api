import { Module } from '@nestjs/common';
import { BiomeController } from './controller/biome.controller';

@Module({
  controllers: [BiomeController]
})
export class BiomeModule {}
