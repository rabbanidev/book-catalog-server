### Live Link: https://book-catalog-server-postgress.onrender.com/

### Application Routes:

#### User

- api/v1/auth/signup (POST)
- api/v1/users (GET)
- api/v1/users/053e87ef-ac5b-4464-af72-ab632b64cf41 (Single GET) Include an id that is saved in your database
- api/v1/users/053e87ef-ac5b-4464-af72-ab632b64cf41 (PATCH)
- api/v1/users/053e87ef-ac5b-4464-af72-ab632b64cf41 (DELETE) Include an id that is saved in your database
- api/v1/profile (GET)

### Category

- api/v1/categories/create-category (POST)
- api/v1/categories (GET)
- api/v1/categories/bb33dd37-0df8-43a8-8b43-11528f232b73 (Single GET) Include an id that is saved in your database
- api/v1/categories/bb33dd37-0df8-43a8-8b43-11528f232b73 (PATCH)
- api/v1/categories/bb33dd37-0df8-43a8-8b43-11528f232b73 (DELETE) Include an id that is saved in your database

### Books

- api/v1/books/create-book (POST)
- api/v1/books (GET)
- api/v1/books/:categoryId/category (GET)
- api/v1/books/:id (GET)
- api/v1/books/:id (PATCH)
- api/v1/books/:id (DELETE)

### Orders

- api/v1/orders/create-order (POST)
- api/v1/orders (GET)
- api/v1/orders/:orderId (GET)

### Reviews

- api/v1/reviews/:bookId (POST)
- api/v1/reviews/:bookId (GET)
