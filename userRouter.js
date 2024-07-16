const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const User = require('../models/User'); // Adjust the path based on your project structure

// POST /users/register
router.post('/register', [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists(),
  check('location', 'Location is required').not().isEmpty()
], async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password, location } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      console.log('User already exists');
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Create new user instance
    user = new User({ email, password, location });

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save user to database
    await user.save();
    console.log('User saved successfully:', user);

    // Fetch real-time weather data
    const weatherResponse = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.OPENWEATHERMAP_API_KEY}`);
    const weatherData = weatherResponse.data;

    // Create JWT payload
    const payload = {
      user: {
        id: user.id
      }
    };

    // Sign JWT token
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 }, (err, token) => {
      if (err) {
        console.error('Error signing token:', err);
        throw err;
      }
      // Send token and weather data as response
      res.json({ token, weatherData });
      console.log('Token and weather data sent successfully');
    });
  } catch (err) {
    console.error('Server Error:', err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
