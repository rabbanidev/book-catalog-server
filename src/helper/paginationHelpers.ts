type ISortOrder = 'asc' | 'desc';

type IOptions = {
  page?: number;
  size?: number;
  sortBy?: string;
  sortOrder?: ISortOrder;
};

type IOptionsReturn = {
  page: number;
  size: number;
  skip: number;
  sortConditions: { [key: string]: ISortOrder };
};

const calculatePagination = (options: IOptions): IOptionsReturn => {
  const page = Number(options.page) || 1;
  const size = Number(options.size) || 10;
  const skip = (page - 1) * size;

  const sortBy = options.sortBy || 'createdAt';
  const sortOrder = options.sortOrder || 'desc';

  const sortConditions: { [key: string]: ISortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  return {
    page,
    size,
    skip,
    sortConditions,
  };
};

const calculateTotalPage = (total: number, size: number): number => {
  let totalPage = 1;
  const divisor = total % size;
  if (divisor > 0) {
    totalPage = parseInt((total / size).toString()) + 1;
  } else {
    totalPage = total / size;
  }

  return totalPage;
};

export const paginationHelpers = {
  calculatePagination,
  calculateTotalPage,
};
