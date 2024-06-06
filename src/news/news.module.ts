import { Module } from '@nestjs/common';
import { NewsController } from './news.controller';
import { News } from '../domain/entities/news';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsRepositoryToken } from './news.tokens';
import NewsRepository from '../external/repositories/news.repository';

@Module({
  controllers: [NewsController],
  imports: [TypeOrmModule.forFeature([News])],
  providers: [
    {
      provide: NewsRepositoryToken, 
      useClass: NewsRepository
    },
  ],
})
export class NewsModule {}
