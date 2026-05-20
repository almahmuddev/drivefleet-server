require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { MongoClient, ServerApiVersion } = require("mongodb");

const authRouter = require("./routes/auth");
const { router: carsRouter, init: initCars } = require("./routes/cars");
const { router: bookingsRouter, init: initBookings } = require("./routes/bookings");

const app = express();
const port = process.env.PORT || 5000;

// allowed origins — local + your deployed Vercel URL
const allowedOrigins = [
  "http://localhost:5173",
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin (e.g. mobile apps, curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

const client = new MongoClient(process.env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db("drivefleet");
    const cars = db.collection("cars");
    const bookings = db.collection("bookings");

    initCars(cars);
    initBookings(bookings, cars);

    app.use("/auth", authRouter);
    app.use("/cars", carsRouter);
    app.use("/bookings", bookingsRouter);

    app.get("/", (req, res) => {
      res.json({ status: "DriveFleet API is running" });
    });

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (err) {
    console.error("DB connection failed:", err);
  }
}

run();
