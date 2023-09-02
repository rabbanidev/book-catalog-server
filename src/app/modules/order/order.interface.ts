export type IOrderCreateRequest = {
  orderedBooks: {
    bookId: string;
    quantity: number;
  }[];
};
