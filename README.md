# Books API

A simple Express + MongoDB REST API for managing books.

## Requirements

- Node.js
- MongoDB instance

## Tech Stack

- **express** — web framework
- **mongoose** — MongoDB object modeling
- **mongodb** — MongoDB driver
- **express-validator** — request validation
- **i18next**, **i18next-http-middleware**, **i18next-fs-backend** — localization of API messages
- **body-parser** — request body parsing
- **dotenv** — environment variable loading
- **nodemon** (dev) — auto-restart during development

## Setup

1. Install dependencies:
   ```
   yarn install
   ```
2. Create a `.env` file in the project root:
   ```
   MONGO_DB_URL=mongodb://localhost:27017/mayapp
   PORT=3000
   ```
3. Start the server:
   ```
   yarn start
   ```
   For development with auto-reload:
   ```
   yarn dev
   ```

The server runs at `http://localhost:3000/` by default.

## Endpoints

Base path: `/books`

| Method | Path        | Description         |
|--------|-------------|----------------------|
| POST   | `/books`      | Create a new book    |
| GET    | `/books`      | List all books       |
| GET    | `/books/:id`  | Get a book by ID     |
| PUT    | `/books/:id`  | Update a book by ID  |
| DELETE | `/books/:id`  | Delete a book by ID  |

### Book fields

| Field    | Type   | Required | Notes                  |
|----------|--------|----------|-------------------------|
| title    | String | yes      | min length 3           |
| author   | String | yes      |                         |
| price    | Number | yes      |                         |
| quantity | Number | yes      | defaults to 1           |

### Example: create a book

```
POST /books
Content-Type: application/json

{
  "title": "The Pragmatic Programmer",
  "author": "David Thomas",
  "price": 39.99,
  "quantity": 5
}
```

## Response format

Successful responses:
```json
{ "success": true, "data": { ... } }
```

Error responses:
```json
{ "success": false, "error": { "code": "BOOK_NOT_FOUND", "message": "..." } }
```

## Notes

- Response messages are localized via i18next (see `locales/`).
- Validation is handled with `express-validator` (see `validators/bookValidator.js`).
