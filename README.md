# DriveFleet Server

REST API for the DriveFleet car rental platform.


**Base URL (production):** `https://drivefleet-server-qlax.onrender.com`


## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env` and configure your environment variables
4. Run development server: `npm run dev`
5. Run production server: `npm start`


## Endpoints

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| POST | `/auth/jwt` | — | Issue JWT cookie |
| POST | `/auth/logout` | — | Clear JWT cookie |
| GET | `/cars` | — | Get all cars |
| GET | `/cars/:id` | — | Get one car |
| POST | `/cars` | ✅ | Add a car |
| PATCH | `/cars/:id` | ✅ | Update a car |
| DELETE | `/cars/:id` | ✅ | Delete a car |
| GET | `/bookings?email=` | ✅ | Get user bookings |
| POST | `/bookings` | ✅ | Create a booking |
