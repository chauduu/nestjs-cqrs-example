export class PaginationResponse<T> {
  id: number;
  page: number;
  limit: number;
  totalCount: number;
  totalRecord: number;
  data: T[];

  constructor(
    page: number,
    limit: number,
    totalCount: number,
    totalRecord: number,
    data: T[],
  ) {
    this.page = page;
    this.limit = limit;
    this.totalCount = totalCount;
    this.totalRecord = totalRecord;
    this.data = data;
  }
}
