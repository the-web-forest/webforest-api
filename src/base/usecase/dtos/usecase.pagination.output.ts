import PartialClass from '../../../domain/base/partial.class';

export default class UseCasePaginationOutput<T> extends PartialClass {
  items: T[];
  total: number;
  page: number;
  itemsPerPage: number;
  totalPages: number;
}
