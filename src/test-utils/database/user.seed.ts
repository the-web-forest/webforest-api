import { faker } from '@faker-js/faker';
import { IUserRepository } from '../../domain/interfaces/repositories/user.repository.interface';

export default class UserSeedTestHelper {
  static async seed(userRepository: IUserRepository) {
    for (let index = 0; index < 10; index++) {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      await userRepository.save({
        firstName: firstName,
        lastName: lastName,
        nickName: faker.internet.userName({ firstName, lastName }),
        email: faker.internet.email({ firstName, lastName }),
        password: faker.internet.password(),
        isActive: true,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

  }
}
