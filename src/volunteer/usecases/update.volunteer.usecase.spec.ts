import { Test, TestingModule } from '@nestjs/testing';
import { UpdateVolunteerUseCase } from './update.volunteer.usecase';
import { IVolunteerRepository } from '../../domain/interfaces/repositories/volunteer.repository.interface';
import { VolunteerRepositoryToken } from '../volunteer.tokens';
import VolunteerAlreadyRegisteredError from '../../core/error/volunteer.already.registered.error';
import UpdateVolunteerUseCaseInput from './dtos/update.volunteer.usecase.input';
import UpdateVolunteerUseCaseOutput from './dtos/update.volunteer.usecase.output';
import { faker } from '@faker-js/faker';

describe('UpdateVolunteerUseCase', () => {
    let usecase: UpdateVolunteerUseCase;
    let volunteerRepository: IVolunteerRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateVolunteerUseCase,
                {
                    provide: VolunteerRepositoryToken,
                    useValue: {
                        findOne: jest.fn(),
                        save: jest.fn(),
                    },
                },
            ],
        }).compile();

        usecase = module.get<UpdateVolunteerUseCase>(UpdateVolunteerUseCase);
        volunteerRepository = module.get<IVolunteerRepository>(VolunteerRepositoryToken);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should update a volunteer successfully', async () => {
      const volunteer = await volunteerRepository.save({
        id: 1,
        name: faker.person.firstName(),
        role: faker.person.jobArea(),
        linkedInUrl: faker.internet.url(),
        photoUrl: faker.internet.url(),
        is_deleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

    });

    it('should throw VolunteerAlreadyRegisteredError when volunteer is already registered with LinkedIn URL', async () => {
        const mockInput: UpdateVolunteerUseCaseInput = {
            id: 1,
            name: 'Updated Name',
            linkedInUrl: 'registered.linkedin.com',
        };
        volunteerRepository.findOne = jest.fn().mockResolvedValue({ id: 2 });

        // Execute the use case and expect it to throw an error
        await expect(usecase.run(mockInput)).rejects.toThrow(VolunteerAlreadyRegisteredError);
        expect(volunteerRepository.findOne).toHaveBeenCalledWith({
            where: {
                linkedInUrl: mockInput.linkedInUrl,
                id: expect.not.toBe(mockInput.id),
            },
        });
        expect(volunteerRepository.save).not.toHaveBeenCalled();
    });
});
