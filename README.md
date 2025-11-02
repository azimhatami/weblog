# Weblog

A modern, type-safe weblog API built with Express.js, TypeScript, and PostgreSQL. Features complete authentication system and full CRUD operations for blog posts.

## Features

- **JWT Authentication** - Secure user registration and login
- **Blog Management** - Full CRUD operations for posts
- **Type Safety** - Built with TypeScript and Drizzle ORM
- **API Documentation** - Interactive Swagger/OpenAPI docs
- **Database Migrations** - Easy database schema management
- **Security** - Password hashing and protected routes

## Tech Stack

**Backend:**
- Express.js 5
- TypeScript
- PostgreSQL
- Drizzle ORM

**Authentication:**
- JWT (JSON Web Tokens)
- bcryptjs

**Documentation:**
- Swagger UI Express
- Swagger JSDoc

**Development:**
- pnpm (package manager)
- tsx (TypeScript execution)

## Installation

1. **Clone and install dependencies:**
```bash
git clone https://github.com/azimhatami/weblog
cd weblog
```
2. **Set up environment variables:**
``` bash
PORT=
POSTGRES_DB=
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_URL=
JWT_SECRET=
```
3. **Generate database schema:**
```bash
pnpm run generate
```
4. **Run migrations:**
```bash
pnpm run migrate
```
5. **Start with Docker Compose:**
```bash
docker-compose up --build
```
