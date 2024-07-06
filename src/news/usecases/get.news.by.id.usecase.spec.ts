import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmSQLITETestingModule } from '../../test-utils/database/TypeORMSQLITETestingModule';
import IUseCase from '../../domain/interfaces/usecase/IUseCase';
import { INewsRepository } from '../../domain/interfaces/repositories/news.repository.interface';
import { GetNewsByIdUseCaseToken, NewsRepositoryToken } from '../news.tokens';
import NewsRepository from '../../external/repositories/news.repository';
import NewsSeedTestHelper from '../../test-utils/database/news.seed';
import GetVolunteerByIdUseCaseInput from '../../volunteer/controller/dtos/get.volunteer.by.id.usecase.input';
import GetVolunteerByIdUsecaseOutput from '../../volunteer/controller/dtos/get.volunteer.by.id.output';
import GetNewsByIdUseCase from './get.news.by.id.usecase';
import GetNewsByIdUseCaseInput from './dtos/get.news.by.id.usecase.input';

describe('Get News By Id Use Case', () => {
    let usecase: IUseCase<GetVolunteerByIdUseCaseInput, GetVolunteerByIdUsecaseOutput>;
    let newsRepository: INewsRepository;
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [...TypeOrmSQLITETestingModule()],
            providers: [
                {
                    provide: GetNewsByIdUseCaseToken,
                    useClass: GetNewsByIdUseCase,
                },
                {
                    provide: NewsRepositoryToken,
                    useClass: NewsRepository,
                },
            ],
        }).compile();
        usecase = module.get<
            IUseCase<GetVolunteerByIdUseCaseInput, GetVolunteerByIdUsecaseOutput>
        >(GetNewsByIdUseCaseToken);
        newsRepository = module.get<INewsRepository>(NewsRepositoryToken);
        await NewsSeedTestHelper.seed(newsRepository);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should get an news by id', async () => {
        const someNews = await newsRepository.findOne({ where: { isDeleted: false } })
        const useCaseInput = new GetNewsByIdUseCaseInput({
            id: someNews.id
        })
        const response = await usecase.run(useCaseInput)
        expect(response).toBeDefined()
        expect(response.id).toBe(someNews.id)
    });

    it('should not get a unregistered news by id', async () => {
        const useCaseInput = new GetNewsByIdUseCaseInput({
            id: 999999
        })
        await expect(async () => {
            await usecase.run(useCaseInput);
        }).rejects.toThrow('{"message":"News Not Found","code":"WF-0007"}');
    });

    it('should not get a deleted news by id', async () => {
        const someNews = await newsRepository.findOne({ where: { isDeleted: false } })
        await newsRepository.update({ id: someNews.id }, { isDeleted: true })

        const useCaseInput = new GetNewsByIdUseCaseInput({
            id: someNews.id
        })
        await expect(async () => {
            await usecase.run(useCaseInput);
        }).rejects.toThrow('{"message":"News Not Found","code":"WF-0007"}');
    });



});
