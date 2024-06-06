import { Module } from '@nestjs/common';
import { NewsController } from './news.controller';
import { News } from '../domain/entities/news';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateNewsUseCaseToken, NewsRepositoryToken } from './news.tokens';
import NewsRepository from '../external/repositories/news.repository';
import CreateNewsUseCase from './usecases/create.news.usecase';

@Module({
  controllers: [NewsController],
  imports: [TypeOrmModule.forFeature([News])],
  providers: [
    {
      provide: NewsRepositoryToken, 
      useClass: NewsRepository
    },
    {
      provide: CreateNewsUseCaseToken,
      useClass: CreateNewsUseCase
    }
  ],
})
export class NewsModule {}
