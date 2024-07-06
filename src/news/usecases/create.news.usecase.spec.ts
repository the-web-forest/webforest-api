import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmSQLITETestingModule } from '../../test-utils/database/TypeORMSQLITETestingModule';
import IUseCase from '../../domain/interfaces/usecase/IUseCase';
import { faker } from '@faker-js/faker/locale/af_ZA';
import CreateNewsUseCaseInput from './dtos/create.news.usecase.input';
import CreateNewsUseCaseOutput from './dtos/create.news.usecase.output';
import { INewsRepository } from '../../domain/interfaces/repositories/news.repository.interface';
import { CreateNewsUseCaseToken, NewsRepositoryToken } from '../news.tokens';
import CreateNewsUseCase from './create.news.usecase';
import NewsRepository from '../../external/repositories/news.repository';
import NewsSeedTestHelper from '../../test-utils/database/news.seed';
import exp from 'constants';

describe('Create News Use Case', () => {
    let usecase: IUseCase<CreateNewsUseCaseInput, CreateNewsUseCaseOutput>;
    let newsRepository: INewsRepository;
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [...TypeOrmSQLITETestingModule()],
            providers: [
                {
                    provide: CreateNewsUseCaseToken,
                    useClass: CreateNewsUseCase,
                },
                {
                    provide: NewsRepositoryToken,
                    useClass: NewsRepository,
                },
            ],
        }).compile();
        usecase = module.get<
            IUseCase<CreateNewsUseCaseInput, CreateNewsUseCaseOutput>
        >(CreateNewsUseCaseToken);
        newsRepository = module.get<INewsRepository>(NewsRepositoryToken);
        await NewsSeedTestHelper.seed(newsRepository);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should create an news', async () => {
        const useCaseInput = new CreateNewsUseCaseInput({
            title: faker.music.songName(),
            url: faker.internet.url().concat('news'),
            imageUrl: faker.internet.url(),
            publishDate: new Date()
        })
        const newsAlreadyRegisteredList = await newsRepository.count()
        const response = await usecase.run(useCaseInput)
        expect(response).toBeDefined()
        expect(response.id).toBe(newsAlreadyRegisteredList + 1)
        expect(response.title).toBe(useCaseInput.title)
        expect(response.url).toBe(useCaseInput.url)
        expect(response.imageUrl).toBe(useCaseInput.imageUrl)
    });

    it('should not create an news with same url', async () => {
        const useCaseInput = new CreateNewsUseCaseInput({
            title: faker.music.songName(),
            url: faker.internet.url().concat('news'),
            imageUrl: faker.internet.url(),
            publishDate: new Date()
        })
        await usecase.run(useCaseInput)
        await expect(async () => {
            await usecase.run(useCaseInput);
        }).rejects.toThrow('{"message":"News Already Registered","code":"WF-0009"}');
    });

});
