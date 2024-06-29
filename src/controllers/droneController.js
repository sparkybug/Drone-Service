const Drone = require('../models/Drone');
const Medication = require('../models/Medication');

// Register a new drone
exports.registerDrone = async(req, res) => {
    try {
        const drone = new Drone(req.body);
        await drone.save();
        res.status(201).json(drone);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Load a drone with medication items
exports.loadDrone = async (req, res) => {
    console.log('Received request to load drone with data:', req.body);

    try {
        const { droneId, medications } = req.body;

        // Validate the input
        if (!droneId || !Array.isArray(medications)) {
        console.log('Invalid input data');
        return res.status(400).json({ error: 'Drone ID and medications are required' });
        }

        // Find the drone by ID
        const drone = await Drone.findById(droneId);
        if (!drone) {
        console.log('Drone not found');
        return res.status(404).json({ error: 'Drone not found' });
        }

        // Validate the medications
        const totalWeight = medications.reduce((sum, med) => sum + med.weight, 0);
        console.log('Total weight of medications:', totalWeight);

        if (totalWeight > drone.weightLimit) {
        console.log('Total weight exceeds drone weight limit');
        return res.status(400).json({ error: 'Exceeds weight limit' });
        }

        // Your logic to load the drone with medications...

        console.log('Drone loaded successfully');
        res.status(200).json({ message: 'Drone loaded successfully' });
    } catch (error) {
        console.error('Error loading drone:', error);
        res.status(500).json({ error: error.message });
    }
};

// Get available drones
exports.availableDrones = async(req, res) => {
    try {
        const availableDrones = await Drone.find({ state: 'IDLE' });
        res.status(200).json(availableDrones);
    } catch (error) {
        console.error('Error loading drone:', error);
        res.status(500).json({ error: error.message });
    }
};

// Get single drone medications by Id
exports.getSingleDrone = async(req, res) => {
    try {
        const { droneId } = req.params;
        const drone = await Drone.findById(droneId).populate('medications');

        if (!drone) {
            return res.status(404).json({ error: 'Drone not found' });
        }

        res.status(200).json(drone);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get drone battery level for a particular drone
exports.checkBatteryLevel = async(req, res) => {
    try {
        const { droneId } = req.params;
        const drone = await Drone.findById(droneId);

        if (!drone) {
            return res.status(404).json({ error: 'Drone not found' });
        }

        res.status(200).json({ batteryLevel: drone.batteryCapacity});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};