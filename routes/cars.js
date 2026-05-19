// 

const express = require("express");
const { ObjectId } = require("mongodb");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

let carsCollection;

const init = (collection) => {
  carsCollection = collection;
};

router.get("/", async (req, res) => {
  try {
    const { search, type, email } = req.query;
    const query = {};

    // search by car name 
    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    // filter by car type
    if (type) {
      query.type = type;
    }

    // filter by owner email 
    if (email) {
      query.ownerEmail = email;
    }

    const cars = await carsCollection.find(query).toArray();
    res.json(cars);
  } catch {
    res.status(500).json({ message: "Failed to fetch cars" });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const car = await carsCollection.findOne({
      _id: new ObjectId(req.params.id),
    });
    if (!car) return res.status(404).json({ message: "Car not found" });
    res.json(car);
  } catch {
    res.status(500).json({ message: "Failed to fetch car" });
  }
});

// cars — add a car 
router.post("/", verifyToken, async (req, res) => {
  try {
    const car = { ...req.body, bookingCount: 0, addedAt: new Date() };
    const result = await carsCollection.insertOne(car);
    res.status(201).json(result);
  } catch {
    res.status(500).json({ message: "Failed to add car" });
  }
});

//  cars — update a car 
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

//  cars — delete a car 
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const result = await carsCollection.deleteOne({
      _id: new ObjectId(req.params.id),
    });
    res.json(result);
  } catch {
    res.status(500).json({ message: "Failed to delete car" });
  }
});

module.exports = { router, init };
