import { faker } from '@faker-js/faker/locale/af_ZA';
import { IBiomeRepository } from '../../domain/interfaces/repositories/biome.repository.interface';
import { INewsRepository } from '../../domain/interfaces/repositories/news.repository.interface';
import { IRoleRepository } from '../../domain/interfaces/repositories/role.repository.interface';

export default class NewsSeedTestHelper {
  static async seed(newsRepository: INewsRepository) {
    await newsRepository.save({
      title: faker.music.songName(),
      url: faker.internet.url(),
      imageUrl: faker.image.url(),
      publishDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      isDeleted: false,
    });

    await newsRepository.save({
      title: faker.music.songName(),
      url: faker.internet.url(),
      imageUrl: faker.image.url(),
      publishDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      isDeleted: false,
    });

    await newsRepository.save({
      title: faker.music.songName(),
      url: faker.internet.url(),
      imageUrl: faker.image.url(),
      publishDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      isDeleted: false,
    });
   
  }
}
