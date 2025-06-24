const captainController = require("../controllers/captain.controller");
const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Please enter a valid email address"),
    body("fullname.firstname") // Fixed typo: was "firsname"
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 characters long"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body("vehicle.color")
      .isLength({ min: 3 })
      .withMessage("Vehicle color is required"),
    body("vehicle.plate")
      .isLength({ min: 3 })
      .withMessage("Plate number must be at least 3 characters long"),
    body("vehicle.capacity")
      .isInt({ min: 1 }) // Fixed: was isIn({ min: 1 })
      .withMessage("Vehicle capacity must be a number greater than 0"),
    body("vehicle.vehicleType")
      .isIn(["car", "motorcycle", "auto"])
      .withMessage("Vehicle type must be one of: car, motorcycle, auto"),
  ],
  captainController.registerCaptain
);

module.exports = router;
