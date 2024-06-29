const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Drone = require('./models/Drone');
const Medication = require('./models/Medication');

dotenv.config();

// Connect to the database
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err));

// Generate 10 drones
const drones = Array.from({ length: 10 }, (_, i) => ({
  serialNumber: `SN${1000 + i}`,
  model: ['Lightweight', 'Middleweight', 'Cruiserweight', 'Heavyweight'][i % 4],
  weightLimit: Math.floor(Math.random() * 300) + 100, // Random weight between 100 and 400
  batteryCapacity: Math.floor(Math.random() * 100) + 1, // Random battery capacity between 1 and 100
  state: ['IDLE', 'LOADED', 'DELIVERING', 'DELIVERED', 'RETURNING'][i % 5]
}));

// Generate 10 medications
const medications = Array.from({ length: 10 }, (_, i) => ({
  name: `Medication${i + 1}`,
  weight: Math.floor(Math.random() * 50) + 1, // Random weight between 1 and 50
  code: `CODE${i + 1}`,
  image: `medication${i + 1}.png`
}));

const seedDatabase = async () => {
  try {
    await Drone.deleteMany({});
    await Medication.deleteMany({});
    await Drone.insertMany(drones);
    await Medication.insertMany(medications);
    console.log('Data seeded successfully');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedDatabase();
