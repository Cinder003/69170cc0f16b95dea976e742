# Prospect Management System - Frontend

This is the frontend for the Prospect Management System, built with React, Vite, TypeScript, and TailwindCSS.

## Features

-   Modern, responsive, and colorful UI.
-   CRUD functionality for managing prospects.
-   Client-side state management with Zustand.
-   Form validation with React Hook Form and Zod.
-   Real-time search/filtering.

## Getting Started

### Prerequisites

-   Node.js (v18 or later)
-   npm
-   Docker (optional, for containerized setup)

### Installation & Setup

1.  **Clone the repository** (if you haven't already).

2.  **Navigate to the `Front-end` directory:**
    ```bash
    cd Front-end
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    ```

4.  **Set up environment variables:**
    Create a `.env` file in the `Front-end` directory and add the following, pointing to your running backend instance:
    ```env
    VITE_API_BASE_URL=http://localhost:3001/api
    ```

### Running the Application

-   **Development Mode:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

-   **Production Build:**
    To create a production build, run:
    ```bash
    npm run build
    ```
    The optimized files will be in the `dist` directory. You can preview the production build locally with:
    ```bash
    npm run preview
    ```

### Running with Docker

From the root project directory:
```bash
docker-compose up --build
```
The frontend will be available at `http://localhost:5173`.

## Available Scripts

-   `npm run dev`: Starts the development server.
-   `npm run build`: Builds the app for production.
-   `npm run lint`: Lints the codebase.
-   `npm run preview`: Serves the production build locally.