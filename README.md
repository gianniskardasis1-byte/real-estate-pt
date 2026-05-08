# HomeFinder - Real Estate Platform

HomeFinder is a full-stack real estate web application for listing and browsing residential properties in Greece.

The project is split into:
- A React + Vite frontend in `client/`
- An Express + Prisma backend at the repository root (server code in `server/`)
- A MongoDB database accessed through Prisma ORM

## Overview
test
The app supports core real-estate workflows:
- Browse all listings
- Filter listings by listing type, region, property type, and max price
- View detailed property information
- Create/list a new property
- Register users and manage bookings/favourites through API endpoints

## Quick Start

### Prerequisites
- Node.js 18+ (recommended: latest LTS)
- npm

### Database
- MongoDB connection string - written in .env file at project root

```env
DATABASE_URL="mongodb+srv://<user>:<password>@<cluster>/<db>?retryWrites=true&w=majority"
PORT=8000
```

### Run 

From the project root:

```bash
npm install #Install backend dependencies
cd client
npm install #Install frontend dependencies
cd ..
npx prisma generate --schema server/prisma/schema.prisma #generate Prisma client

npm start #Run backend - Starts Express with Nodemon using index.js

#Open a 2nd terminal at project root and write:

cd client
npm run dev #Starts frontend - Open URL printed by Vite (typically `http://localhost:5173`)

```

### Notes
- `DATABASE_URL` is required by Prisma (`server/prisma/schema.prisma`).
- The frontend expects backend API at `http://localhost:8000` through Vite proxy.

## Tech Stack

### Frontend
- React 19
- React Router DOM 7
- Vite 7
- Axios
- React Icons
- Plain CSS (`client/src/index.css`)

### Backend
- Node.js + Express 5
- Prisma Client / Prisma ORM 5
- MongoDB datasource (via Prisma)
- express-async-handler
- CORS, cookie-parser, dotenv

### Tooling
- ESLint (frontend)
- Nodemon (backend dev run)

## Architecture

### Frontend architecture
- Entry point: `client/src/main.jsx`
- App shell and routing: `client/src/App.jsx`
- Pages:
	- `Home.jsx` (hero, stats, featured/latest listings)
	- `Properties.jsx` (full searchable listing catalog)
	- `PropertyDetail.jsx` (single listing details)
	- `AddProperty.jsx` (listing creation form)
- Shared components:
	- Header, Footer
	- SearchFilters
	- PropertyCard
- API abstraction layer in `client/src/api/api.js`
- Vite dev proxy forwards `/api` to `http://localhost:8000`

### Backend architecture
- Server bootstrap: `index.js`
- Routes:
	- `server/routes/residencyRoute.js`
	- `server/routes/userRoute.js`
- Controllers:
	- `server/controllers/resdCntrl.js`
	- `server/controllers/userCntrl.js`
- Prisma client singleton:
	- `server/config/prisma.configs.js`
- Data model:
	- `server/prisma/schema.prisma`

## Data Model (Prisma + MongoDB)

### User
- `id` (ObjectId)
- `name`, `email` (unique), `image`
- `bookedVisits` (JSON array)
- `favResidenciesID` (ObjectId string array)
- Relation: owns many `Residency` records via `email`

### Residency
- `id` (ObjectId)
- Core fields: `title`, `description`, `price`, `address`, `city`
- Optional/extended: `region`, `area`, `bedrooms`, `bathrooms`, `yearBuilt`, `images`
- Classification: `listingType` (`sale|rent`), `propertyType`
- `facilities` JSON object
- Ownership: `userEmail` references `User.email`
- `createdAt`, `updatedAt`

## API Endpoints

Base URL: `http://localhost:8000/api`

### Residency endpoints
- `POST /residency/create`
	- Body shape: `{ data: { ...residencyFields } }`
- `GET /residency/allresidencies`
- `GET /residency/:id`

### User endpoints
- `POST /user/register`
- `POST /user/bookVisit/:id`
- `POST /user/cancelBooking/:id`
- `POST /user/addFavourite/:rid`
- `POST /user/allFavourites`
- `POST /user/allBookings`

## Scripts

### Root (backend)
- `npm start` -> runs backend via Nodemon

### Frontend (`client/`)
- `npm run dev` -> start Vite dev server
- `npm run build` -> production build
- `npm run preview` -> preview production build
- `npm run lint` -> run ESLint

## Design Decisions and Conventions

- Monorepo-like layout with separate frontend folder (`client`) and backend code at root + `server/`.
- API-first frontend using a centralized Axios module (`client/src/api/api.js`).
- Lightweight state handling via React hooks (`useState`, `useEffect`) with no global state library.
- Flexible property metadata (facilities/bookings) stored as JSON fields for fast iteration.
- Greece-focused UX and data defaults (`country: Greece`, region/city lists).

## Known Limitations / Important Notes

- No authentication/authorization is enforced on API routes yet.
- No input validation middleware is present on backend endpoints.
- Error handling is basic and mostly controller-level.
- Root workspace includes several unrelated/generated artifacts and utility files that are not required for core app execution.
- `tasks.json` appears unrelated to this JavaScript project (Haskell tasks).

## Suggested Improvements

- Add auth (JWT/Auth0) and protect write endpoints.
- Add request validation (e.g., Zod/Joi + centralized middleware).
- Add pagination/sorting for listing endpoints.
- Add tests (unit + integration for API and component tests for UI).
- Add separate backend folder/package for clearer dependency boundaries.

## Troubleshooting

- If frontend requests fail with network errors:
	- Ensure backend is running on port `8000`.
	- Confirm Vite proxy is active in `client/vite.config.js`.
- If Prisma cannot connect:
	- Verify `DATABASE_URL` in root `.env`.
	- Run `npx prisma generate --schema server/prisma/schema.prisma` again.

## Team Notes

This README was derived from the current implementation in the repository and can be used as the baseline project documentation for onboarding and handoff.