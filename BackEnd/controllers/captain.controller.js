const captainModel = require("../models/captain.model");
const captainService = require("../services/captain.service");
const { validationResult } = require("express-validator");

module.exports.registerCaptain = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password, vehicle } = req.body;

  const isCaptainAlreadyExists = await captainModel.findOne({
    email,
  });

  if (isCaptainAlreadyExists) {
    return res.status(400).json({
      message: "Captain with this email already exists",
    });
  }

  const hashedPassword = await captainModel.hashPassword(password);

  const captain = await captainService.createCaptain(
    fullname.firstname,
    fullname.lastname,
    email,
    hashedPassword,
    vehicle.color,
    vehicle.plate,
    vehicle.capacity,
    vehicle.vehicleType
  );
  const token = captain.generateAuthToken();

  res.status(201).json({
    token,
    captain,
  });
};
