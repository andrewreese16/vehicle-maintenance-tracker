const express = require("express");
const router = express.Router();
const VehicleModel = require("../models/vehicle");

// Create a car
router.post("/", async function (req, res) {
  const createdVehicle = await VehicleModel.create(req.body);
  res.redirect("/vehicles");
});

router.get("/", async function (req, res) {
  const allVehicleDocs = await VehicleModel.find({});
  res.render("vehicles/index.ejs", { vehicleDocs: allVehicleDocs });
});

router.get("/:vehicleId", async function (req, res) {
  const vehicleDoc = await VehicleModel.findById(req.params.vehicleId);
  res.render("vehicles/show.ejs", { vehicle: vehicleDoc });
});

router.get("/new", async function (req, res) {
  res.render("vehicles/new.ejs");
});

router.delete("/:vehicleId", async function (req, res) {
  const deletedVehicle = await VehicleModel.findByIdAndDelete(
    req.params.vehicleId
  );
  res.redirect("/vehicles");
});

router.get("/:vehicleId/edit", async function (req, res) {
  const vehicleDoc = await VehicleModel.findById(
    req.params.vehicleId,
    req.body
  );
  res.render("/vehicles/edit.ejs");
});

router.put("/:vehicleId", async function (req, res) {
  await VehicleModel.findByIdAndUpdate(req.params.vehicleId, req.body);
  res.redirect(`/vehicles${req.params.vehicleId}`);
});

module.exports = router;
