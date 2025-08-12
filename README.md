
https://github.com/user-attachments/assets/62b5d8e7-7785-49da-8226-65e42d17b20f



# Express Blog

A full-stack blog application built with Express.js backend and Vue.js frontend, featuring real-time chat functionality, user authentication, and a modern responsive design.

## 🚀 Features

- **User Authentication**: Secure login/signup with JWT tokens
- **Blog Posts**: Create, read, update, and delete blog posts
- **Comments**: Interactive commenting system on posts
- **Real-time Chat**: Socket.io powered chat functionality
- **User Profiles**: Profile management with image upload
- **Role-based Access**: Admin and user roles with different permissions
- **Responsive Design**: Modern UI built with Vue 3 and Tailwind CSS
- **Database**: PostgreSQL with migrations
- **Docker Support**: Complete containerization setup

## 🏗️ Architecture

### Backend Architecture (Clean Architecture)
```
backend/
├── src/
│   ├── domain/          # Business entities and interfaces
│   ├── application/     # Use cases and business logic
│   └── infrastructure/  # Database, external services
├── interfaces/          # HTTP routes, controllers, validators
├── configs/            # Configuration files
└── di.js              # Dependency injection container
```

### Frontend Architecture (Vue 3 + TypeScript)
```
frontend/
├── src/
│   ├── components/     # Reusable Vue components
│   ├── views/          # Page components
│   ├── stores/         # Pinia state management
│   ├── apis/           # API service layer
│   └── types/          # TypeScript type definitions
```

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js with ES modules
- **Framework**: Express.js 5.x
- **Database**: PostgreSQL with node-pg-migrate
- **Authentication**: JWT with bcrypt
- **Real-time**: Socket.io
- **Validation**: Joi
- **Dependency Injection**: Awilix
- **File Upload**: Multer

### Frontend
- **Framework**: Vue 3 with Composition API
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Pinia
- **Routing**: Vue Router 4
- **HTTP Client**: Axios
- **Real-time**: Socket.io Client
- **Build Tool**: Vite

### DevOps
- **Containerization**: Docker & Docker Compose
- **Database Admin**: pgAdmin
- **Code Quality**: ESLint, Prettier

## 📋 Prerequisites

- Node.js 20.19.0 or >=22.12.0
- Docker and Docker Compose
- Git

## 🚀 Quick Start

### Option 1: Using Docker (Recommended)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd expressBlog
   ```

2. **Start all services**
   ```bash
   docker-compose up -d
   ```

3. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000
   - pgAdmin: http://localhost:5050 (admin@admin.com / admin)

### Option 2: Local Development

1. **Backend Setup**
   ```bash
   cd backend
   npm install
   
   # Set up environment variables
   cp .env.example .env
   # Edit .env with your database credentials
   
   # Run database migrations
   npm run migrate
   
   # Start development server
   npm start
   ```

2. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   
   # Start development server
   npm run dev
   ```

## 📁 Project Structure

```
expressBlog/
├── backend/                 # Express.js backend
│   ├── src/                # Clean architecture layers
│   ├── interfaces/         # HTTP interfaces
│   ├── configs/           # Configuration files
│   ├── di.js              # Dependency injection
│   └── package.json
├── frontend/               # Vue.js frontend
│   ├── src/               # Source code
│   ├── public/            # Static assets
│   └── package.json
├── docker-compose.yml      # Docker services
└── README.md
```

## 🔧 Configuration

### Environment Variables

Create `.env` files in both `backend/` and `frontend/` directories:

**Backend (.env)**
```env
PORT=3000
DATABASE_URL=postgresql://sobhan:337459azA@localhost:5432/blog_app_db
JWT_SECRET=your_jwt_secret_here
```

**Frontend (.env)**
```env
VITE_API_BASE_URL=http://localhost:3000
VITE_SOCKET_URL=http://localhost:3000
```

## 🗄️ Database Schema

The application uses PostgreSQL with the following main tables:
- `users` - User accounts and profiles
- `posts` - Blog posts
- `comments` - Post comments
- `chats` - Chat sessions
- `messages` - Chat messages

## 🔌 API Endpoints

### Authentication
- `POST /auth/signup` - User registration
- `POST /auth/login` - User login
- `GET /auth/me` - Get current user

### Users
- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user
- `POST /users/:id/profile-image` - Upload profile image

### Posts
- `GET /posts` - Get all posts
- `GET /posts/:id` - Get post by ID
- `POST /posts` - Create new post
- `PUT /posts/:id` - Update post
- `DELETE /posts/:id` - Delete post

### Comments
- `GET /posts/:postId/comments` - Get post comments
- `POST /posts/:postId/comments` - Add comment
- `PUT /comments/:id` - Update comment
- `DELETE /comments/:id` - Delete comment

### Chat
- `GET /chats` - Get user chats
- `POST /chats` - Start new chat
- `GET /chats/:id/messages` - Get chat messages

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 📝 Development

### Code Quality
- **Backend**: ESLint with JSDoc plugin
- **Frontend**: ESLint with Vue and TypeScript support
- **Formatting**: Prettier for both frontend and backend

### Available Scripts

**Backend**
```bash
npm start          # Start production server
npm run lint       # Run ESLint
npm run lint:fix   # Fix ESLint issues
npm run format     # Format code with Prettier
```

**Frontend**
```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
npm run format     # Format code with Prettier
```

## 🐳 Docker Commands

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Rebuild and start
docker-compose up --build

# Remove volumes (database data)
docker-compose down -v
```

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- CORS configuration
- Input validation with Joi
- Role-based authorization
- File upload security

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**sobhan.mahmoudishamsabad**

## 🆘 Support

If you encounter any issues or have questions:
1. Check the existing issues
2. Create a new issue with detailed information
3. Include error logs and steps to reproduce

---

**Happy Blogging! 🚀**
