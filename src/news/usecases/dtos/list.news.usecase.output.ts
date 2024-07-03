import UseCasePaginationOutput from '../../../base/usecase/dtos/usecase.pagination.output';
import { News } from '../../../domain/entities/news';

export default class ListNewsUseCaseOutput extends UseCasePaginationOutput<News> {}
