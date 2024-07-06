import PartialClass from '../../../domain/base/partial.class';

export default class UseCasePaginationInput extends PartialClass {
  page: number;
  itemsPerPage: number;
}
