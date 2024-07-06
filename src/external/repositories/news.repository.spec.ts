import { TestingModule, Test } from '@nestjs/testing';
import { TypeOrmSQLITETestingModule } from '../../test-utils/database/TypeORMSQLITETestingModule';
import { INewsRepository } from '../../domain/interfaces/repositories/news.repository.interface';
import { NewsRepositoryToken } from '../../news/news.tokens';
import NewsRepository from './news.repository';
import NewsSeedTestHelper from '../../test-utils/database/news.seed';
import { News } from '../../domain/entities/news';

describe('News Repository Tests', () => {
  let newsRepository: INewsRepository;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmSQLITETestingModule()],
      providers: [
        {
          provide: NewsRepositoryToken,
          useClass: NewsRepository,
        },
      ],
    }).compile();
    newsRepository = module.get<NewsRepository>(NewsRepositoryToken);
    await NewsSeedTestHelper.seed(newsRepository);
  });

  it('should find news', async () => {
    const news = await newsRepository.find();
    expect(news[0]).toBeInstanceOf(News);
  });

  it('should find all news', async () => {
    const news = await newsRepository.find();
    expect(news.length).toBe(50);
  });
});
