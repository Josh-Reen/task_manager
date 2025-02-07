const Task = require('../models/task');

// @desc    Get all tasks for current user
// @route   GET /api/tasks
// @access  Private
const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ assignedTo: req.user._id })
            .populate('assignedBy', 'name email')
            .populate('assignedTo', 'name email')
            .sort({ createdAt: -1 });

        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tasks', error: error.message });
    }
};

// @desc    Get single task
// @route   GET /api/tasks/:id
// @access  Private
const getTask = async (req, res) => {
    try {
        const task = await Task.findOne({
            _id: req.params.id,
            assignedTo: req.user._id
        })
        .populate('assignedBy', 'name email')
        .populate('assignedTo', 'name email');

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.json(task);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching task', error: error.message });
    }
};

// @desc    Create new task
// @route   POST /api/tasks
// @access  Private
const createTask = async (req, res) => {
    try {
        const { title, description, assignedTo } = req.body;

        if (!title) {
            return res.status(400).json({ message: 'Please provide a task title' });
        }

        const task = await Task.create({
            title,
            description,
            assignedTo: assignedTo || req.user._id, // If no assignee specified, assign to self
            assignedBy: req.user._id,
            status: 'pending'
        });

        const populatedTask = await Task.findById(task._id)
            .populate('assignedBy', 'name email')
            .populate('assignedTo', 'name email');

        res.status(201).json(populatedTask);
    } catch (error) {
        res.status(400).json({ message: 'Error creating task', error: error.message });
    }
};

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = async (req, res) => {
    try {
        const task = await Task.findOne({
            _id: req.params.id,
            $or: [
                { assignedTo: req.user._id },
                { assignedBy: req.user._id }
            ]
        });

        if (!task) {
            return res.status(404).json({ message: 'Task not found or unauthorized' });
        }

        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            { ...req.body, updatedAt: Date.now() },
            { new: true, runValidators: true }
        )
        .populate('assignedBy', 'name email')
        .populate('assignedTo', 'name email');

        res.json(updatedTask);
    } catch (error) {
        res.status(400).json({ message: 'Error updating task', error: error.message });
    }
};

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = async (req, res) => {
    try {
        const task = await Task.findOne({
            _id: req.params.id,
            $or: [
                { assignedTo: req.user._id },
                { assignedBy: req.user._id }
            ]
        });

        if (!task) {
            return res.status(404).json({ message: 'Task not found or unauthorized' });
        }

        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting task', error: error.message });
    }
};

// @desc    Update task status
// @route   PATCH /api/tasks/:id/status
// @access  Private
const updateTaskStatus = async (req, res) => {
    try {
        const { status } = req.body;

        if (!['pending', 'in-progress', 'completed'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status value' });
        }

        const task = await Task.findOne({
            _id: req.params.id,
            assignedTo: req.user._id
        });

        if (!task) {
            return res.status(404).json({ message: 'Task not found or unauthorized' });
        }

        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            { 
                status,
                updatedAt: Date.now()
            },
            { new: true }
        )
        .populate('assignedBy', 'name email')
        .populate('assignedTo', 'name email');

        res.json(updatedTask);
    } catch (error) {
        res.status(400).json({ message: 'Error updating task status', error: error.message });
    }
};

module.exports = {
    getTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask,
    updateTaskStatus
};