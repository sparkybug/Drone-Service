const mongoose = require('mongoose');

const droneSchema = new mongoose.Schema({
    serialNumber: {
        type: String,
        required: true,
        maxLength: 100
    },

    model: {
        type: String,
        required: true,
        enum: [
            'Lightweight', 'Middleweight', 'Cruiserweight', 'Heavyweight'
        ]
    },

    weightLimit: {
        type: Number,
        required: true,
        max: 500
    },

    batteryCapacity: {
        type: Number,
        required: true
    },

    state: {
        type: String,
        required: true,
        enum: [
            'IDLE', 'LOADING', 'LOADED', 'DELIVERING', 'DELIVERED', 'RETURNING'
        ]
    },

    medications: [{
        type: mongoose.SchemaTypes.ObjectId, ref: 'Medication'
    }],
});


module.exports = mongoose.model('Drone', droneSchema);