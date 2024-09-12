const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
  make: String,
  model: String,
  year: Date,
  vin: String,
  maintenanceDate: Date,
  mileage: Number,
  partName: String,
  partNumber: String,
});

const VehicleModel = mongoose.model("Vehicle", vehicleSchema);

module.exports = VehicleModel;
