import { faker } from '@faker-js/faker';
import { IUserRepository } from '../../domain/interfaces/repositories/user.repository.interface';
import { IVolunteerRepository } from 'src/domain/interfaces/repositories/volunteer.repository.interface';

export default class VolunteerSeedTestHelper {
  static async seed(volunteerRepository: IVolunteerRepository) {
    for (let index = 0; index < 10; index++) {
      await volunteerRepository.save({
        id: index,
        name: faker.person.firstName(),
        role: faker.person.jobArea(),
        linkedInUrl: faker.internet.url(),
        photoUrl: faker.internet.url(),
        is_deleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
  }
}
