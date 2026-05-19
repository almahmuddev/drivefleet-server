require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");

const cars = [
  {
    name: "Toyota Camry XSE",
    type: "Sedan",
    dailyPrice: 55,
    image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=600&q=80",
    seats: 5,
    location: "Dhaka, Bangladesh",
    description: "A smooth, reliable sedan perfect for city drives and long highway trips. Fuel-efficient with a comfortable interior.",
    available: true,
    bookingCount: 0,
    addedAt: new Date(),
    ownerEmail: "admin@drivefleet.io",
  },
  {
    name: "Ford Explorer Sport",
    type: "SUV",
    dailyPrice: 85,
    image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=600&q=80",
    seats: 7,
    location: "Chittagong, Bangladesh",
    description: "Spacious 7-seater SUV ideal for family trips or group travel. Powerful engine with all-terrain capability.",
    available: true,
    bookingCount: 0,
    addedAt: new Date(),
    ownerEmail: "admin@drivefleet.io",
  },
  {
    name: "BMW 3 Series",
    type: "Luxury",
    dailyPrice: 140,
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&q=80",
    seats: 5,
    location: "Dhaka, Bangladesh",
    description: "Experience German engineering at its finest. Premium leather interior, sport mode, and advanced driver assist.",
    available: true,
    bookingCount: 0,
    addedAt: new Date(),
    ownerEmail: "admin@drivefleet.io",
  },
  {
    name: "Honda Civic RS",
    type: "Sedan",
    dailyPrice: 48,
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&q=80",
    seats: 5,
    location: "Sylhet, Bangladesh",
    description: "Sporty and fuel-efficient. Great for daily commutes with a stylish exterior and modern infotainment system.",
    available: true,
    bookingCount: 0,
    addedAt: new Date(),
    ownerEmail: "admin@drivefleet.io",
  },
  {
    name: "Toyota Fortuner",
    type: "SUV",
    dailyPrice: 95,
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&q=80",
    seats: 7,
    location: "Rajshahi, Bangladesh",
    description: "Tough, dependable and roomy. A favourite for road trips and rough terrain. Diesel powered for long distances.",
    available: true,
    bookingCount: 0,
    addedAt: new Date(),
    ownerEmail: "admin@drivefleet.io",
  },
  {
    name: "Hyundai Tucson",
    type: "SUV",
    dailyPrice: 70,
    image: "https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=600&q=80",
    seats: 5,
    location: "Dhaka, Bangladesh",
    description: "A sleek crossover with a panoramic sunroof, wireless charging, and a smooth hybrid powertrain.",
    available: true,
    bookingCount: 0,
    addedAt: new Date(),
    ownerEmail: "admin@drivefleet.io",
  },
  {
    name: "Mercedes C-Class",
    type: "Luxury",
    dailyPrice: 160,
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&q=80",
    seats: 5,
    location: "Dhaka, Bangladesh",
    description: "Redefine your journey in this elegant executive sedan. Digital cockpit, Burmester sound system included.",
    available: false,
    bookingCount: 3,
    addedAt: new Date(),
    ownerEmail: "admin@drivefleet.io",
  },
  {
    name: "Suzuki Swift",
    type: "Hatchback",
    dailyPrice: 35,
    image: "https://images.unsplash.com/photo-1541443131876-96f1eba1b8b5?w=600&q=80",
    seats: 5,
    location: "Comilla, Bangladesh",
    description: "Nimble and affordable. Perfect for zipping through city traffic. Easy to park, easy on fuel.",
    available: true,
    bookingCount: 0,
    addedAt: new Date(),
    ownerEmail: "admin@drivefleet.io",
  },
];

async function seed() {
  const client = new MongoClient(process.env.MONGODB_URI, {
    serverApi: { version: "1", strict: true, deprecationErrors: true },
  });

  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db("drivefleet");
    const collection = db.collection("cars");

    // clear existing cars first
    await collection.deleteMany({});
    console.log("Cleared existing cars");

    const result = await collection.insertMany(cars);
    console.log(`Inserted ${result.insertedCount} cars successfully`);
  } catch (err) {
    console.error("Seed failed:", err);
  } finally {
    await client.close();
  }
}

seed();
