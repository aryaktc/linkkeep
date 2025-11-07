# LinkKeep - Backend (Express + MongoDB)

## Setup
1. Copy `.env.example` to `.env` and fill values (MONGO_URI, JWT_SECRET).
2. `npm install`
3. `npm run dev` (requires nodemon) or `npm start`

The API endpoints:
- POST /api/auth/register
- POST /api/auth/login
- GET /api/profile
- PUT /api/profile
- CRUD on /api/bookmarks
