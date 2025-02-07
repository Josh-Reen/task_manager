const dotenv = require('dotenv');
const connectDB = require('../config/db');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const cors = require('./cors'); // Import the cors package

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Use the CORS middleware
app.use(cors({
    origin: 'http://localhost:3000', // Replace with your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify the allowed HTTP methods
    credentials: true // If you need to include credentials in the request
}));

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
