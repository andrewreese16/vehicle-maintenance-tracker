const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const methodOverride = require("method-override");
const morgan = require("morgan");
const path = require("path");
const session = require("express-session");
const VehicleModel = require("./models/vehicle");

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", function () {
  console.log(`Connected to DB ${mongoose.connection.name}`);
});

const vehicleController = require("./controllers/vehicle");

// Middleware
app.use(express.urlencoded({ extend: false }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUnitalized: true,
  })
);

app.get("/", function (req, res) {
  res.render("index.ejs");
});

app.use("/vehicles", vehicleController);

app.listen(3000, function () {
  console.log("Server is listening on port 3000");
});
