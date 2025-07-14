const express = require('express');
const router = express.Router();
const User = require('../models/User');
const PointHistory = require('../models/PointHistory');

// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add a new user
router.post('/users', async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'Name is required' });
  }
  try {
    const existingUser = await User.findOne({ name });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const user = new User({ name });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Claim points for a user
router.post('/claim', async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const points = Math.floor(Math.random() * 10) + 1; // Random points 1-10
    user.totalPoints += points;
    await user.save();

    const history = new PointHistory({ userId, points });
    await history.save();

    res.json({ points, totalPoints: user.totalPoints });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get leaderboard
router.get('/leaderboard', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10; // As per PDF, 10 users per page
  try {
    const users = await User.find()
      .sort({ totalPoints: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
    const totalUsers = await User.countDocuments();
    const leaderboard = users.map((user, index) => ({
      rank: (page - 1) * limit + index + 1,
      name: user.name,
      totalPoints: user.totalPoints,
      _id: user._id,
    }));
    res.json({
      leaderboard,
      totalPages: Math.ceil(totalUsers / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get point history for a user
router.get('/history/:userId', async (req, res) => {
  try {
    const history = await PointHistory.find({ userId: req.params.userId })
      .populate('userId', 'name')
      .sort({ timestamp: -1 });
    res.json(history);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;