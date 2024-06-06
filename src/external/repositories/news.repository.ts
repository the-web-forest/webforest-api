import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { News } from "../../domain/entities/news";
import BaseRepository from "./base.repository";
import { INewsRepository } from "../../domain/interfaces/repositories/news.repository.interface";

@Injectable()
export default class NewsRepository
  extends BaseRepository<News>
  implements INewsRepository
{
  constructor(
    @InjectRepository(News)
    private readonly newsRepository: Repository<News>,
  ) {
    super(newsRepository);
  }
}