const express = require('express');
const router = express.Router();
const droneController = require('../controllers/droneController');

router.post('/drones', droneController.registerDrone);
router.post('/drones/load', droneController.loadDrone);

router.get('/drones/available', droneController.availableDrones);
router.get('/drones/:droneId', droneController.getSingleDrone);
router.get('drones/:droneId/batteryCapacity', droneController.checkBatteryLevel);

module.exports = router;