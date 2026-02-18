# Blog Mini Project – Backend

This is the backend for **Blog Mini Project**, a practice project built with **Node.js, Express, TypeScript, Prisma, and MySQL**.  
The goal of this project was to learn building a backend with a relational database using Prisma, and provide RESTful APIs for a blog application.

> Previously, this project was implemented with Convex for learning purposes:  
> **Repo:** https://github.com/erfan-web/nextjs-16-blog  
> **Demo:** https://nextjs16blog.vercel.app

---

## Table of Contents

- [Frontend Repository And Demo](#frontend-repository-and-demo)
- [Technologies](#technologies)
- [Features](#features)
- [Requirements](#requirements)
- [Setup and Running Locally](#setup-and-running-locally)
- [API Endpoints](#api-endpoints)
- [Future Improvements](#future-improvements)

---
## Frontend Repository And Demo

**Repository:** https://github.com/erfan-web/blog-project-frontend

**Demo:** https://blog-project-frontend-nextjs.vercel.app

---

## Technologies

- Node.js
- Express
- TypeScript
- Prisma ORM
- MySQL (Railway)
- bcrypt
- JWT (jsonwebtoken)
- Zod (validation)
- CORS
- cookie-parser

---

## Features

- JWT authentication (login, register, logout)
- Role-based authorization (Admin / User)
- CRUD operations for Posts
- CRUD operations for Comments
- Search posts by title and content
- Seeded users for testing
- Prisma migrations and ORM
- Centralized error handling middleware

---

## Requirements

- Node.js >= 18
- npm or yarn
- MySQL (local or Railway)
- Prisma CLI (`npx prisma`)

---

## Setup and Running Locally

Follow these steps to run the backend project locally.

---

### 1. Clone the repository

```bash
git clone https://github.com/erfan-web/blog-project-backend.git
cd blog-project-backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create .env file
Create a .env file in the root of the project and add your local database credentials:

```env
# Local MySQL Database
DATABASE_URL="mysql://username:password@localhost:3306/dbname"
DATABASE_HOST=localhost
DATABASE_USER=root
DATABASE_PASSWORD=1234
DATABASE_NAME=blog_local
DATABASE_PORT=3306

# JWT
JWT_SECRET=your_jwt_secret

# Port
PORT=8000
```

### 4. Configure Prisma for Local Database
Edit the **src/config/prisma.ts**:

Uncomment the local database adapter and comment the Railway adapter:

```ts
/* Local Database */
const adapter = new PrismaMariaDb({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  connectionLimit: 10,
  connectTimeout: 60000,
  socketTimeout: 60000,
});

/* Railway Database (comment this when running locally) */
// const adapter = new PrismaMariaDb({
//   host: process.env.MYSQLHOST,
//   user: process.env.MYSQLUSER,
//   password: process.env.MYSQLPASSWORD,
//   database: process.env.MYSQLDATABASE,
//   connectionLimit: 10,
//   connectTimeout: 60000,
//   socketTimeout: 60000,
// });
```

### 5. Run Database Migrations
Since migrations are already included in the repo, run:

```bash
npx prisma migrate dev
```
This will create tables in your local MySQL database.

### 6. Generate Prisma Client

```bash
npx prisma generate
```

### 7. Seed the Database
To login as an administrator and use the access, you must complete this step.
```bash
npm run local-seed
```
This will create Two test users and sample data.
|  name |       email       | password |  role |
|:-----:|:-----------------:|:--------:|:-----:|
| Admin | admin@example.com | admin123 | ADMIN |


### 7. Start the server
```bash
npm run dev
```

The server will run on:
```arduino
http://localhost:8000
```

---

## Production Build

```bash
npm run build
npm start
```

---

## API Endpoints

All API routes are prefixed with:


Authentication is handled using **HTTP-only cookies (JWT)**.  
Most routes require authentication via the `verifyToken` middleware.

---

### Auth Routes

Base path:

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/register` | Register a new user | ❌ |
| POST | `/login` | Login user and set JWT cookie | ❌ |
| POST | `/logout` | Logout and clear cookie | ✅ |
| GET | `/me` | Get current logged-in user | ✅ |

---

### Post Routes

Base path:

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| GET | `/` | Get all posts | ✅ | User |
| GET | `/single/:id` | Get a single post by ID | ✅ | User |
| GET | `/search?term=xxx&limit=5` | Search posts by title/content | ✅ | User |
| POST | `/` | Create a new post | ✅ | Admin only |

---

### Comment Routes

Base path:

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Get all comments | ✅ |
| GET | `/post/:postId` | Get comments by post ID | ✅ |
| POST | `/` | Create a comment | ✅ |

---

### Example Search Request

```http
GET /api/posts/search?term=nextjs&limit=5
```
---

## Future Improvements

- OTP-based authentication or refresh token mechanism

- Additional API endpoints for advanced features

- Rate limiting and security improvements

- Integration with the frontend for full-stack demo
