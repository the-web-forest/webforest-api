import { Repository } from 'typeorm';

export interface IBaseRepository<T> extends Repository<T> {}
