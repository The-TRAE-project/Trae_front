export interface FilteredResponse<T> {
  content: T;
  currentNumberPage: number;
  totalElements: number;
  totalPages: number;
}

export interface FilterValues {
  elementPerPage?: string;
  page?: string;
  role?: string;
  status?: string;
  isActive?: string;
  typeWorkId?: string;
}
