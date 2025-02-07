const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

// Database Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected');
    createUsersCollection();
    createTasksCollection();
  })
  .catch((err) => console.error('MongoDB connection error:', err));

// Create Users Collection
const createUsersCollection = async () => {
  try {
    await mongoose.connection.createCollection('users', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['name', 'email', 'password', 'isAdmin'],
          properties: {
            name: {
              bsonType: 'string',
              description: 'must be a string and is required'
            },
            email: {
              bsonType: 'string',
              description: 'must be a string and is required'
            },
            password: {
              bsonType: 'string',
              description: 'must be a string and is required'
            },
            isAdmin: {
              bsonType: 'bool',
              description: 'must be a boolean and is required'
            }
          }
        }
      },
      validationLevel: 'strict',
      validationAction: 'error'
    });
    console.log('Users collection created');
  } catch (error) {
    console.error('Error creating users collection:', error);
  }
};

// Create Tasks Collection
const createTasksCollection = async () => {
  try {
    await mongoose.connection.createCollection('tasks', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['title', 'status', 'assignedTo', 'assignedBy'],
          properties: {
            title: {
              bsonType: 'string',
              description: 'must be a string and is required'
            },
            description: {
              bsonType: 'string',
              description: 'must be a string'
            },
            status: {
              bsonType: 'string',
              enum: ['pending', 'in-progress', 'completed'],
              description: 'must be one of enum values and is required'
            },
            assignedTo: {
              bsonType: 'objectId',
              description: 'must be an ObjectId and is required'
            },
            assignedBy: {
              bsonType: 'objectId',
              description: 'must be an ObjectId and is required'
            }
          }
        }
      },
      validationLevel: 'strict',
      validationAction: 'error'
    });
    console.log('Tasks collection created');
  } catch (error) {
    console.error('Error creating tasks collection:', error);
  }
};
