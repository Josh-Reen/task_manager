const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/user');

dotenv.config();

// Database Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Add Admin User
const addAdmin = async () => {
  try {
    const admin = new User({
      name: 'Joshua Gondwe',      
      email: 'jgondwe59@gmail.com', 
      password: '12',  
      isAdmin: true
    });

    await admin.save();
    console.log('Admin user created:', admin);
  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    mongoose.connection.close();
  }
};

addAdmin();
