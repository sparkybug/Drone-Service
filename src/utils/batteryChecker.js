const Drone = require('../models/Drone');

const checkDroneBatteries = async () => {
    const drones = await Drone.find();
    drones.forEach(drone => {
        // Logic to check and log battery levels
    });
};

setInterval(checkDroneBatteries, 3600000); // this is to check battery level every hour