import { Module } from '@nestjs/common';
import { NewsController } from './controller/news.controller';
import { News } from '../domain/entities/news';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateNewsUseCaseToken, GetNewsByIdUseCaseToken, NewsRepositoryToken, UpdateNewsUseCaseToken } from './news.tokens';
import NewsRepository from '../external/repositories/news.repository';
import CreateNewsUseCase from './usecases/create.news.usecase';
import GetNewsByIdUseCase from './usecases/get.news.by.id.usecase';
import UpdateNewsUseCase from './usecases/update.news.usecase';

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
    },
    {
      provide: GetNewsByIdUseCaseToken,
      useClass: GetNewsByIdUseCase
    },
    {
      provide: UpdateNewsUseCaseToken,
      useClass: UpdateNewsUseCase
    }
  ],
})
export class NewsModule { }
