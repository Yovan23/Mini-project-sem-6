// UserController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Logi = require('../Model/logi_Model');

const generateToken = (userId, role) => {
  return jwt.sign({ userId, role }, 'your_secret_key', { expiresIn: '1h' });
};

const logiController = {
  // Controller for user login
  login: async (req, res) => {
    const { username, password } = req.body;

    try {
      // Find the user in the database by username
      const logi = await Logi.findOne({ username });

      // If user not found
      if (!logi) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Check if password is correct
      const passwordMatch = await bcrypt.compare(password, logi.password);

      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Generate JWT token
      const token = generateToken(logi._id, logi.role);

      // Return token to the client
      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  // Controller for user registration
  register: async (req, res) => {
    const { username, email, password } = req.body;

    try {
      // Check if username or email already exists
      const existingUser = await Logi.findOne({ $or: [{ username }, { email }] });

      if (existingUser) {
        return res.status(400).json({ message: 'Username or email already exists' });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new user
      const newlogi = new Logi({ username, email, password: hashedPassword, role: '' });
      await newlogi.save();

      // Generate JWT token
      const token = generateToken(newlogi._id, newlogi.role);

      // Return token to the client
      res.status(201).json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }
};

module.exports = logiController;
