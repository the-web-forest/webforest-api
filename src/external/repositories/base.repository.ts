import { BaseEntity, Repository } from 'typeorm';

export default abstract class BaseRepository<
  T extends BaseEntity,
> extends Repository<T> {
  constructor(repository: Repository<T>) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
