const bcrypt = require('bcryptjs');
const User = require('../model/userModel');
const Enums = require('../constant/enums');
const ApiResponse = require('../config/apiResponse');
const convertToJSON = require('../config/convertToJson');


// Register User
const registerUser = async (req, res) => {
  const { name, email, mobileNumber, role, password, address } = req.body;

  // Simple validation
  if (!name || !email || !mobileNumber || !role || !password) {
    return res.status(400).json(ApiResponse.badRequest('Please enter all required fields.'));
  }

  // Validate role
  if (!Object.values(Enums.ROLES).includes(role)) {
    return res.status(400).json(ApiResponse.badRequest('Invalid role specified.'));
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json(ApiResponse.badRequest('User with this email already exists.'));
    }

    // Check if mobile number already exists
    const existingMobileUser = await User.findOne({ mobileNumber });
    if (existingMobileUser) {
      return res.status(400).json(ApiResponse.badRequest('User with this mobile number already exists.'));
    }

    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      name,
      email,
      mobileNumber,
      role,
      password: hashedPassword,
      address,
    });

    await newUser.save();

    res.status(201).json(ApiResponse.created(
      convertToJSON(newUser),
      'User registered successfully.',
    ));
  } catch (err) {
    console.error(err.message);
    res.status(500).json(ApiResponse.serverError('Server error.'));
  }
};

module.exports = {
  registerUser,
};
