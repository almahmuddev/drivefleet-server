# DriveFleet Server

REST API for the DriveFleet car rental platform.

**Base URL (production):** `#`



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
