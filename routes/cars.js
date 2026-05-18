const express = require("express");
const { ObjectId } = require("mongodb");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

// these functions get injected from index.js once db is connected
let carsCollection;

const init = (collection) => {
  carsCollection = collection;
};

// GET /cars — get all cars (supports ?search= and ?type= later)
router.get("/", async (req, res) => {
  try {
    const cars = await carsCollection.find().toArray();
    res.json(cars);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch cars" });
  }
});

// GET /cars/:id — get one car
router.get("/:id", async (req, res) => {
  try {
    const car = await carsCollection.findOne({ _id: new ObjectId(req.params.id) });
    if (!car) return res.status(404).json({ message: "Car not found" });
    res.json(car);
  } catch {
    res.status(500).json({ message: "Failed to fetch car" });
  }
});

// POST /cars — add a car (private)
router.post("/", verifyToken, async (req, res) => {
  try {
    const car = { ...req.body, bookingCount: 0, addedAt: new Date() };
    const result = await carsCollection.insertOne(car);
    res.status(201).json(result);
  } catch {
    res.status(500).json({ message: "Failed to add car" });
  }
});

// PATCH /cars/:id — update a car (private, owner only)
router.patch("/:id", verifyToken, async (req, res) => {
  try {
    const { _id, ...updates } = req.body;
    const result = await carsCollection.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: updates }
    );
    res.json(result);
  } catch {
    res.status(500).json({ message: "Failed to update car" });
  }
});

// DELETE /cars/:id — delete a car (private, owner only)
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const result = await carsCollection.deleteOne({ _id: new ObjectId(req.params.id) });
    res.json(result);
  } catch {
    res.status(500).json({ message: "Failed to delete car" });
  }
});

module.exports = { router, init };
