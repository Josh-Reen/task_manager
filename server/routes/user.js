const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Task = require('../models/task');
const authMiddleware = require('../middleware/auth');

// Get user dashboard data
router.get('/dashboard', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    const tasks = await Task.find({ 
      $or: [
        { assignedTo: req.user._id },
        { assignedBy: req.user._id }
      ]
    }).populate('assignedBy assignedTo', 'name email');

    res.json({
      user,
      tasks,
      taskStats: {
        total: tasks.length,
        pending: tasks.filter(task => task.status === 'pending').length,
        inProgress: tasks.filter(task => task.status === 'in-progress').length,
        completed: tasks.filter(task => task.status === 'completed').length
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin dashboard data
router.get('/admin', authMiddleware, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const users = await User.find().select('-password').lean();
    const tasks = await Task.find().populate('assignedBy assignedTo', 'name email');

    res.json({
      stats: {
        totalUsers: users.length,
        totalTasks: tasks.length,
        completedTasks: tasks.filter(task => task.status === 'completed').length,
        activeUsers: users.filter(user => !user.isAdmin).length
      },
      recentUsers: users.slice(-5),
      recentTasks: tasks.slice(-5)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;