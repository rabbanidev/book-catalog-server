export const bookFilterableFields: string[] = [
  'search',
  'minPrice',
  'maxPrice',
  'category',
];

export const bookSearchableFields: string[] = ['title', 'author', 'genre'];

export const bookRelationalFields: string[] = ['category'];

export const bookRelationalMapperFields: { [key: string]: string } = {
  category: 'category',
};
