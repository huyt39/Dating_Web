import { Request } from 'express';

interface Pagination {
  currentPage: number;
  limitItems: number;
  skip: number;
  totalPage: number;
}

export const paginationHelper = (limitItems: number, query: Request['query'], count: number): Pagination => {
  const objectPagination: Pagination = {
    currentPage: 1,
    limitItems: limitItems,
    skip: 0,
    totalPage: 0
  };

  if (query.page) {
    objectPagination.currentPage = parseInt(query.page as string);
  }

  objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItems;
  objectPagination.totalPage = Math.ceil(count / objectPagination.limitItems);

  return objectPagination;
};
