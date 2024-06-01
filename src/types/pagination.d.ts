export type PaginatorResult<T> = {
  data: T[];
  dataCount: number;
  pageDataCount: number;
  routes: PaginatorRoutes;
  totalData: number;
};

type PaginatorRoutes = {
  nextPage: null | string;
  previousPage: null | string;
};
