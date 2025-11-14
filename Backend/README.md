# Prospect Management System - Backend

This is the backend for the Prospect Management System, built with Node.js, Express, TypeScript, and Prisma.

## Features

- RESTful API for CRUD operations on prospects.
- SQLite database with Prisma ORM.
- Request validation with Zod.
- Secure by default with Helmet, CORS, and rate limiting.
- Structured logging with Pino.

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm
- Docker (optional, for containerized setup)

### Installation & Setup

1.  **Clone the repository** (if you haven't already).

2.  **Navigate to the `Backend` directory:**
    ```bash
    cd Backend
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    ```

4.  **Set up environment variables:**
    Create a `.env` file in the `Backend` directory and copy the contents of `.env.example` (if provided) or add the following:
    ```env
    PORT=3001
    DATABASE_URL="file:./data/dev.db"
    CORS_ORIGIN="http://localhost:5173"
    ```

5.  **Set up the database:**
    Run the Prisma migration to create the database file and tables:
    ```bash
    npx prisma migrate dev --name init
    ```
    This will create a `dev.db` file inside a `data` directory.

### Running the Application

-   **Development Mode (with hot-reloading):**
    ```bash
    npm run dev
    ```
    The server will start on the port specified in your `.env` file (default: 3001).

-   **Production Mode:**
    First, build the TypeScript code:
    ```bash
    npm run build
    ```
    Then, start the server:
    ```bash
    npm start
    ```

### Running with Docker

From the root project directory:
```bash
docker-compose up --build
```
The backend will be available at `http://localhost:3001`.

## API Endpoints

All endpoints are prefixed with `/api`.

### Prospects

-   `GET /prospects`: Get a list of all prospects. Supports searching via query parameter `?search=...`.
-   `POST /prospects`: Create a new prospect.
-   `GET /prospects/:id`: Get a single prospect by its ID.
-   `PUT /prospects/:id`: Update an existing prospect.
-   `DELETE /prospects/:id`: Delete a prospect.

### Request Body for `POST` / `PUT`

```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "phone": "123-456-7890",
  "company": "Example Inc."
}
```