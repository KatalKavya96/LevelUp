# LevelUp Push-Up Muscle Builder

A production-style full-stack fitness guide focused on push-up exercises. The app lets users select one target muscle, fetch matching push-up variations from the API/database, select multiple exercises, and run a local workout panel with timers, set tracking, instructions, mistakes, benefits, and muscle-target visuals.

## Tech Stack

- Frontend: Next.js, TypeScript, Tailwind CSS, Framer Motion, lucide-react
- Backend: Node.js, Express.js, TypeScript, Prisma ORM
- Database: MySQL
- API: REST with validation, layered services, repositories, controllers, DTOs, and shared error handling

## Project Structure

```text
backend/
  src/
    config/                 Environment and Prisma singleton
    core/                   Domain entities and repository interfaces
    application/            DTO validation schemas and services
    infrastructure/         Prisma schema, migrations, seed, repositories
    presentation/           Controllers, routes, middleware
    shared/                 ApiResponse, AppError, asyncHandler
    app.ts                  Express app composition
    server.ts               Server bootstrap and shutdown

frontend/
  app/                      Next app routes
  components/
    layout/                 Navbar and footer
    exercises/              Muscle selector, exercise cards, timers, panels
    ui/                     Button, badge, card, progress primitives
  hooks/                    Exercise fetching and local timer state
  lib/                      API client, shared types, utilities
  styles/                   Tailwind globals
```

## Setup

Install dependencies from the repo root:

```bash
npm install
```

Create environment files:

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env.local
```

Update `backend/.env` if your MySQL credentials differ:

```env
DATABASE_URL="mysql://root:password@localhost:3306/pushup_builder"
PORT=5000
FRONTEND_URL="http://localhost:3000"
```

Create the database if it does not already exist:

```bash
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS pushup_builder;"
```

Generate Prisma Client:

```bash
npm run prisma:generate
```

Run the migration:

```bash
npm run prisma:migrate -- --name init
```

Seed muscles and push-up exercises:

```bash
npm run db:seed
```

Start the backend:

```bash
npm run dev:backend
```

Start the frontend in a second terminal:

```bash
npm run dev:frontend
```

Open:

- Frontend: http://localhost:3000
- Backend health: http://localhost:5000/health

## API Routes

Muscles:

- `GET /api/muscles`
- `GET /api/muscles/:slug`

Exercises:

- `GET /api/exercises`
- `GET /api/exercises?muscle=chest`
- `GET /api/exercises/:slug`
- `POST /api/exercises`
- `PATCH /api/exercises/:id`
- `DELETE /api/exercises/:id`

Create/update exercise requests accept primary and secondary muscle slugs through `primaryMuscleSlug` and `secondaryMuscleSlugs`.

## Verification

Completed locally:

```bash
env DATABASE_URL=mysql://root:password@localhost:3306/pushup_builder npm run prisma:generate -w backend
env DATABASE_URL=mysql://root:password@localhost:3306/pushup_builder npx prisma validate --schema backend/src/infrastructure/database/prisma/schema.prisma
npm run build -w backend
npm run build -w frontend
```

The local MySQL server on this machine rejected the sample `root:password` credentials, so migration and seed could not be applied here. Once `backend/.env` has valid local MySQL credentials, run:

```bash
npm run prisma:migrate -- --name init
npm run db:seed
```

Current npm audit note: the latest stable Next.js package available during setup still reports a moderate advisory through its nested PostCSS dependency. The project is pinned to the latest stable Next line (`^16.2.6`); rerun `npm update next` when a fixed stable release is available.
