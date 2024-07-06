import UseCasePaginationInput from '../../../base/usecase/dtos/usecase.pagination.input';

export default class ListVolunteersUseCaseInput extends UseCasePaginationInput {
  name?: string;
}
