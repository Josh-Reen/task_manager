# task_manager

## Table of Contents
1. [Setup Instructions](#setup-instructions)
2. [Environment Configuration](#environment-configuration)

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm (v8 or higher)
- Git
- For Database i have used mongodb

### Installation Steps
```bash
# Clone the repository (if using Git)
git clone [repository-https://github.com/Josh-Reen/task_manager.git]
cd task_manager

# Or create project directory
mkdir task_manager
cd task_manager

# Initialize project
npm init -y

# Install dependencies
npm install 

# Install dev dependencies
npm install
including mongoose

After installations
the server runs on port 5000
while the frontend runs on port 3000
```

### Project Structure
```
task_manager/
├── src/
│   ├── config/
│   │   ├── config.ts
│   │   └── db.ts
│   ├── controllers/
│   │   ├── authController.js
│   │   └── taskController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── user.js
│   │   └── task.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── task.js
│   │   └── user.js
│   └── server.js
├── .env
├── package.json

```

### Running the Application
```bash
# Development mode
npm run dev

# Build and run production
npm run build
npm start
```

## API Endpoints

### Authentication

#### Register User
- **URL**: `/api/auth/register`
- **Method**: `POST`
- **Headers**: 
  ```
  Content-Type: application/json
  ```
- **Body**:
  ```json
  {
    "email": "jgondwe59@gmail.com",
    "password": "12"
  }
  ```
#### Login
- **URL**: `/api/auth/login`
- **Method**: `POST`
- **Headers**: 
  ```
  
### Tasks

#### Create Task
- **URL**: `/api/tasks`
- **Method**: `POST`
- **Headers**: 
  ```
  Content-Type: application/json
  Authorization: Bearer [jwt-token]
  ```
- 
## Prerequisites

Make sure you have the following installed:
- Node.js (v16 or higher)
- npm (v7 or higher)

## Project Setup

### 1. Clone the repository and install dependencies

```bash
# Clone the project (if using git)
git clone [repository-https://github.com/Josh-Reen/task_manager.git]
cd task-management

# Or create project directory
mkdir task-manager
cd task-manager

# Install dependencies
npm install
```

### 2. Environment Configuration

Create a `.env` file in the root directory:

### 3. Run the Application

```bash
# Development mode
npm start

# Build for production
npm run build

# Preview production build
npm run preview
```

## API Endpoints

The application expects the following API endpoints:

### Authentication

```
POST /api/auth/register
- Request: { email: string, password: string, name?: string }
- Response: { user: User, token: string }

POST /api/auth/login
- Request: { email: string, password: string }
- Response: { user: User, token: string }
```

### Tasks

```
GET /api/tasks
- Headers: Authorization: Bearer <token>
- Response: Task[]

POST /api/tasks
- Headers: Authorization: Bearer <token>
- Request: { title: string, description?: string }
- Response: Task

PATCH /api/tasks/:id
- Headers: Authorization: Bearer <token>
- Request: { status?: TaskStatus, title?: string, description?: string }
- Response: Task
```

## Type Definitions

### User

```typescript
interface User {
  id: number;
  email: string;
  name?: string;
  createdAt: string;
}
```

### Task

```typescript
type TaskStatus = 'todo' | 'in_progress' | 'completed';

interface Task {
  id: number;
  title: string;
  description?: string;
  status: TaskStatus;
  userId: number;
  createdAt: string;
  updatedAt: string;
}
```

## Development

### Adding New Features

1. Create new components in the appropriate directory
2. Add types to `types/` directory
3. Create/update services in `services/` directory
4. Use composables for shared logic

### Code Style

- Use Nodejs for all new files
- Frontend part React 

## Production Deployment

1. Update the `.env` file with production API URL
2. Build the application:
```bash
npm run build
```
3. The built files will be in the `dist/` directory
4. Deploy the contents of `dist/` to your hosting service

## Troubleshooting

### Common Issues

1. **API Connection Failed**
   - Check if the API server is running
   - Verify API_BASE_URL in .env file
   - Check network access permissions

2. **TypeScript Errors**
   - Run `npm run type-check`
   - Ensure all types are properly defined
   - Check import paths

3. **Network Access Issues**
   - Verify firewall settings
   - Check port availability
   - Confirm network interface configuration

### Getting Help

If you encounter issues:
1. Check the console for error messages
2. Verify network requests in browser DevTools
3. Ensure all environment variables are set correctly

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License
