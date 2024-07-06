import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmSQLITETestingModule } from '../../test-utils/database/TypeORMSQLITETestingModule';
import { Logger } from '@nestjs/common';
import ListNewsUseCase from './list.news.usecase';
import ListNewsUseCaseInput from './dtos/list.news.usecase.input';
import ListNewsUseCaseOutput from './dtos/list.news.usecase.output';
import { INewsRepository } from '../../domain/interfaces/repositories/news.repository.interface';
import { NewsRepositoryToken } from '../news.tokens';
import NewsRepository from '../../external/repositories/news.repository';
import NewsSeedTestHelper from '../../test-utils/database/news.seed';

describe('List News Use Case', () => {
    let usecase: ListNewsUseCase;
    let newsRepository: INewsRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [...TypeOrmSQLITETestingModule()],
            providers: [
                ListNewsUseCase,
                {
                    provide: Logger,
                    useValue: {
                        log: jest.fn(),
                        error: jest.fn(),
                        warn: jest.fn(),
                        debug: jest.fn(),
                        verbose: jest.fn(),
                    },
                },
                {
                    provide: NewsRepositoryToken,
                    useClass: NewsRepository,
                },
            ],
        }).compile();

        usecase = module.get<ListNewsUseCase>(ListNewsUseCase);
        newsRepository = module.get<INewsRepository>(NewsRepositoryToken);
        await NewsSeedTestHelper.seed(newsRepository)
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should list news with no filters', async () => {

        const allNews = await newsRepository.find({ where: { isDeleted: false } })
        const itemsPerPage = 10

        const input: ListNewsUseCaseInput = {
            page: 1,
            itemsPerPage,
        };

        const result = await usecase.run(input);

        expect(result).toBeInstanceOf(ListNewsUseCaseOutput);
        expect(result.items).toHaveLength(10);
        expect(result.total).toBe(allNews.length);
        expect(result.page).toBe(1);
        expect(result.itemsPerPage).toBe(10);
        expect(result.totalPages).toBe(allNews.length / itemsPerPage);
    });

    it('should list news with title filter', async () => {
        const input: ListNewsUseCaseInput = {
            page: 1,
            itemsPerPage: 10,
            title: 'Example Title',
        };

        await newsRepository.update({ id: 1 }, { title: 'Example Title' })

        const result = await usecase.run(input);

        expect(result).toBeInstanceOf(ListNewsUseCaseOutput);
        expect(result.items).toHaveLength(1); // Adjust as per your seeding
        expect(result.total).toBe(1); // Adjust as per your seeding
        expect(result.page).toBe(1);
        expect(result.itemsPerPage).toBe(10);
        expect(result.totalPages).toBe(1);
    });

});

