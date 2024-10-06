# Task Management Web App

This **Task Management Web App** is built with **NestJS** for the backend and **Next.js** for the frontend. It includes task management features with secure authentication and a user-friendly interface. Both the frontend and backend are organized into separate directories: `backend-api` and `frontend-task-app`.

## Features

### Frontend - Task Management Web App

- **Secure Authentication**: Login, signup, and password recovery (forgot password).
- **Beautiful User Interface**: A responsive and well-designed UI.
- **Task Management**: Add, edit, delete, and update tasks.
- **Filtering and Search**: Filter tasks by search, status, and priority.
- **Pagination**: Support for managing large task sets.
- **Column Control**: Users can filter, hide, and customize task table columns.

### Backend - Task Management API
- **Swagger Documentation**: Documentation for task management API.
- **NestJS-based API**: Highly secure API built with **NestJS**.
- **Authentication & Authorization**: JWT-based authentication and role-based authorization using **Passport JWT**.
- **Google Authentication**: Google OAuth support.
- **Task, User, and Authentication APIs**: APIs to manage tasks, users, and authentication.
- **Rate Limiting**: Rate-limiting on login requests for security.
- **Highly Scalable**: Backend designed for scalability.

### Environment Variables

The environment variables are provided in `.env.example`. Copy it to `.env` and update the values accordingly.

```bash
cp .env.example .env
```

## File Structure

### Backend - `backend-api`

```
backend-api/
│
├── dist/                # Build output
├── prisma/              # Database schema (Prisma)
├── public/              # Static files (if any)
├── src/                 # Source code
│   ├── common/          # Reusable decorators and services
│   ├── core/            # Core config, filters, guards, strategies, and interfaces
│   ├── database/        # Database configuration
│   ├── domain/          # Domain-specific modules, controllers, and services
│   │   ├── auth/        # Authentication-related logic
│   │   ├── task/        # Task management-related logic
│   │   ├── user/        # User management-related logic
│   │   └── domain.module.ts  # Domain module combining all services and controllers
│   ├── helper/          # Helper functions
│   ├── lib/             # External package configurations (e.g., Cloudinary)
│   ├── utils/           # Utility functions (e.g., password hashing)
│   └── views/           # Views (e.g., HTML content)
├── test/                # Test files
└── .env.example         # Example environment file
```

### Frontend - `frontend-task-app`

```
frontend-task-app/
│
├── app/                 # Next.js pages and API routes
├── components/          # Reusable UI components
├── helpers/             # Shared helper functions
├── lib/                 # External libraries and configurations
├── redux/               # Redux store and slices
├── types/               # TypeScript interfaces
├── utils/               # Utility functions
└── .env.example         # Example environment file
```

## Setup and Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Padam7890/full-stack-task-management
   cd task-management-web-app
   ```

2. Set up environment variables for both frontend and backend:

   ```bash
   cd backend-api
   cp .env.example .env

   cd ../frontend-task-app
   cp .env.example .env
   ```

3. Install dependencies for both frontend and backend:

   ```bash
   # Backend
   cd backend-api
   npm install

   # Frontend
   cd ../frontend-task-app
   npm install
   ```

4. Run both applications:

   ```bash
   # Backend
   cd backend-api
   npm run start:dev

   # Frontend
   cd ../frontend-task-app
   npm run dev
   ```

5. Access the application:

   - Frontend: [http://localhost:3001](http://localhost:3000)

   - Backend API: [http://localhost:3000](http://localhost:3001)

    - Backend API Swagger Documentation: [http://localhost:3001/api/docs](http://localhost:3001/api/docs)


