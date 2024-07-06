import UseCasePaginationOutput from '../../../base/usecase/dtos/usecase.pagination.output';
import { Volunteer } from '../../../domain/entities/volunteer';

export default class ListVolunteersUseCaseOutput extends UseCasePaginationOutput<Volunteer> {}
