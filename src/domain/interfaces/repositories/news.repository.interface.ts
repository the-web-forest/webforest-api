import { Repository } from 'typeorm';
import { News } from '../../entities/news';

export interface INewsRepository extends Repository<News> { }
