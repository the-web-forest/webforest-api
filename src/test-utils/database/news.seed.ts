import { faker } from '@faker-js/faker/locale/af_ZA';
import { INewsRepository } from '../../domain/interfaces/repositories/news.repository.interface';

export default class NewsSeedTestHelper {
  static async seed(newsRepository: INewsRepository) {
    for (let i = 0; i < 50; i++) {
      await newsRepository.save({
        title: faker.music.songName(),
        url: faker.internet.url(),
        imageUrl: faker.image.url(),
        publishDate: faker.date.past(),
        createdAt: new Date(),
        updatedAt: new Date(),
        isDeleted: false,
      });
    }
  }
}
