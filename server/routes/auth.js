const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user.js'); // Ensure this path matches your file structure
const authMiddleware = require('../middleware/auth.js');

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body; // Added name to match your schema
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Create new user with name field
    const user = await User.create({
      name,
      email,
      password
    });

    // Generate token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '24h'
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check password using the matchPassword method from your schema
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '24h'
    });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token // Removed isAdmin field from the response
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Logout
router.post('/logout', authMiddleware, (req, res) => {
  res.json({ message: 'Logged out successfully' });
});

module.exports = router;
