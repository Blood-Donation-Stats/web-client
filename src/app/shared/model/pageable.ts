export interface Pageable<Element> {
  content: Element[];
  // pageable: Pageable;
  totalElements: number;
  last: boolean;
  totalPages: number;
  number: number;
  size: number;
  // sort: Sort2;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}
