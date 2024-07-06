import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmSQLITETestingModule } from '../../test-utils/database/TypeORMSQLITETestingModule';
import { VolunteerRepositoryToken } from '../volunteer.tokens';
import { IVolunteerRepository } from '../../domain/interfaces/repositories/volunteer.repository.interface';
import VolunteerNotFoundError from '../../core/error/volunteer.not.found.error';
import DeleteVolunteerByIdUseCaseInput from '../controller/dtos/delete.volunteer.by.id.usecase.input';
import DeleteVolunteerByIdUseCase from './delete.volunteer.by.id.usecase';
import VolunteerRepository from '../../external/repositories/volunteer.repository';
import VolunteerSeedTestHelper from '../../test-utils/database/volunteer.seed';

describe('DeleteVolunteerByIdUseCase', () => {
    let usecase: DeleteVolunteerByIdUseCase;
    let volunteerRepository: IVolunteerRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [...TypeOrmSQLITETestingModule()],
            providers: [
                DeleteVolunteerByIdUseCase,
                {
                    provide: VolunteerRepositoryToken,
                    useClass: VolunteerRepository,
                },
            ],
        }).compile();

        usecase = module.get<DeleteVolunteerByIdUseCase>(DeleteVolunteerByIdUseCase);
        volunteerRepository = module.get<IVolunteerRepository>(VolunteerRepositoryToken);
        await VolunteerSeedTestHelper.seed(volunteerRepository);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should delete a volunteer', async () => {
        const volunteerId = 1;
        const input = new DeleteVolunteerByIdUseCaseInput({ id: volunteerId });
        const result = await usecase.run(input);
        expect(result.id).toEqual(volunteerId);
        expect(result.isDeleted).toEqual(true);
    });

    it('should throw VolunteerNotFoundError when volunteer is not found', async () => {
        const volunteerId = 999;
        const input = new DeleteVolunteerByIdUseCaseInput({ id: volunteerId });
        await expect(usecase.run(input)).rejects.toThrow('{"message":"Volunteer Not Found","code":"WF-0008"}');
    });

});
