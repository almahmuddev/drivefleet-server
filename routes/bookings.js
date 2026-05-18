const express = require("express");
const { ObjectId } = require("mongodb");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

let bookingsCollection;
let carsCollection;

const init = (bookings, cars) => {
  bookingsCollection = bookings;
  carsCollection = cars;
};

// GET /bookings?email= — get bookings for logged-in user
router.get("/", verifyToken, async (req, res) => {
  // make sure token email matches query email
  if (req.user.email !== req.query.email) {
    return res.status(403).json({ message: "Forbidden" });
  }

  try {
    const bookings = await bookingsCollection
      .find({ userEmail: req.query.email })
      .toArray();
    res.json(bookings);
  } catch {
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
});

// POST /bookings — create a booking and increment car's booking count
router.post("/", verifyToken, async (req, res) => {
  try {
    const booking = { ...req.body, bookedAt: new Date() };
    const result = await bookingsCollection.insertOne(booking);

    // increment booking_count on the car using $inc
    await carsCollection.updateOne(
      { _id: new ObjectId(req.body.carId) },
      { $inc: { bookingCount: 1 } }
    );

    res.status(201).json(result);
  } catch {
    res.status(500).json({ message: "Failed to create booking" });
  }
});

module.exports = { router, init };
