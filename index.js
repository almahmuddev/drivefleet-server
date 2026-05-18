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

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// MongoDB setup
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

    // inject collections into route handlers
    initCars(cars);
    initBookings(bookings, cars);

    // Routes
    app.use("/auth", authRouter);
    app.use("/cars", carsRouter);
    app.use("/bookings", bookingsRouter);

    // Health check
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
