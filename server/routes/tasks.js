const express = require('express');
const authMiddleware = require('../middleware/auth'); 
const Task = require('../models/task');

const router = express.Router();

// Get all tasks for current user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user._id });
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: error.message });
  }
});

// Create new task
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, description, assignedTo, assignedBy } = req.body;

    if (!title) {
      return res.status(400).json({ error: 'Please provide a task title' });
    }

    const task = new Task({
      title,
      description,
      status: 'pending',
      assignedTo: assignedTo || req.user._id,
      assignedBy: assignedBy || req.user._id,
      userId: req.user._id
    });

    await task.save();
    res.status(201).json(task);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(400).json({ error: error.message });
  }
});

// Update task
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    res.json(task);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(400).json({ error: error.message });
  }
});

// Delete task
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id
    });
    
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    res.json({ message: 'Task deleted' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ error: error.message });
  }
});

// Toggle task completion
router.patch('/:id/complete', authMiddleware, async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.user._id
    });
    
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    task.completed = !task.completed;
    await task.save();
    
    res.json(task);
  } catch (error) {
    console.error('Error toggling task completion:', error);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
