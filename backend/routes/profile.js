const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', async (req, res) => {
  res.json(req.user);
});

router.put('/', async (req, res) => {
  try {
    const { name } = req.body;
    const u = await User.findByIdAndUpdate(req.user._id, { name }, { new: true }).select('-password');
    res.json(u);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
