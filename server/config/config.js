const dotenv = require('dotenv');
dotenv.config();
const config = {
    port: process.env.PORT || 5000,
    mongodbURI: process.env.MONGODB_URI || 'mongodb://localhost:27017/task-manager',
    jwtSecret: process.env.JWT_SECRET
};
module.exports = config;
