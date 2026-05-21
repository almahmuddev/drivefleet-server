// load environment variables from .env 
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { MongoClient, ServerApiVersion } = require("mongodb");

// import route 
const authRouter = require("./routes/auth");
const { router: carsRouter, init: initCars } = require("./routes/cars");
const { router: bookingsRouter, init: initBookings } = require("./routes/bookings");

const app = express();
const port = process.env.PORT || 5000;


const allowedOrigins = [
  "http://localhost:5173",
  process.env.CLIENT_URL,
].filter(Boolean);

// setup CORS for allow requests from front
app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin 
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// setup MongoDB client
const client = new MongoClient(process.env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // connect to database
    await client.connect();
    console.log("Connected to MongoDB");

    // get the  collections
    const db = client.db("drivefleet");
    const cars = db.collection("cars");
    const bookings = db.collection("bookings");

    // initialize routes with database collections
    initCars(cars);
    initBookings(bookings, cars);

    // register routes
    app.use("/auth", authRouter);
    app.use("/cars", carsRouter);
    app.use("/bookings", bookingsRouter);

    // check endpoint
    app.get("/", (req, res) => {
      res.json({ status: "DriveFleet API is running" });
    });

    // start server
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (err) {
    console.error("DB connection failed:", err);
  }
}

run();
