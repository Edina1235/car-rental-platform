// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Atlas URI
const uri = 'mongodb+srv://carRental:carRental123@cluster0.stbcjzc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
//const uri = 'mongodb://carRental:carRental123@cluster0.stbcjzc.mongodb.net:27017';
 
mongoose.connect(uri,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // authSource:"admin",
        // ssl: true,
    }) //, {useNewUrlParser: true, useUnifiedTopology: true }
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

const vehicleSchema = new mongoose.Schema({
  brand: String,
  model: String,
  dailyRate: Number,
  images: [String],
  createdAt: { type: Date, default: Date.now }
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

app.get('/vehicles', async (req, res) => {
  const vehicles = await Vehicle.find({});
  res.json(vehicles);
});

const extraServiceSchema = new mongoose.Schema({
  name: String,
  description: String,
  pricePerDay: Number
});

const ExtraService = mongoose.model('ExtraService', extraServiceSchema);

app.get('/extraServices', async (req, res) => {
  const extras = await ExtraService.find();
  res.json(extras);
});

module.exports = app;

app.listen(3000, () => console.log('Server is running on port 3000'));
