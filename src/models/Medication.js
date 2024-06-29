const mongoose = require('mongoose');

const medicationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        match: /^[a-zA-Z0-9-_]+$/
    },

    weight: {
        type: Number,
        required: true,
    },

    code: {
        type: String,
        required: true,
        match: /^[a-zA-Z0-9-_]+$/
    },

    image: {
        type: String,
        required: true
    },
});


module.exports = mongoose.model('Medication', medicationSchema);