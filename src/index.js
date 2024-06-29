const express = require('express');
const mongoose = require('mongoose');
const droneRoutes = require('./routes/droneRoutes');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());

// mongoose.connect(process.env.DB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => console.log('Connected to MongoDB')).catch(err => console.error(err));

// mongoose.set("strictQuery", false);
const mongoDB = process.env.DB_URI

main().catch((err) => console.log(err));
async function main() {
    await mongoose.connect(mongoDB);
}

app.use('/api', droneRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Load the battery checker
require('./utils/batteryChecker');


module.exports = app;