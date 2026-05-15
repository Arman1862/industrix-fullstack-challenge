# Industrix - Todo App

Industrix Todo App is a simple fullstack web application for managing your daily tasks. Built using Node.js for the backend and React for the frontend, it features a complete CRUD system, category management, task prioritization, and server-side search and pagination.

## 🛠️ Tech Stack

### Frontend
- **Framework**: React with Vite
- **UI Library**: Ant Design
- **State Management**: Context API
- **HTTP Client**: Axios
- **Date Utilities**: Day.js

### Backend
- **Framework**: Node.js & Express.js
- **ORM**: Sequelize
- **Validation**: Joi
- **Testing**: Jest & Supertest

### Database
- **Engine**: PostgreSQL

### DevOps
- **Containerization**: Docker & Docker Compose

## 🗄️ Database Schema

The database consists of two main tables with a **One-to-Many** relationship:

### 1. Categories
| Column | Type | Constraints |
| --- | --- | --- |
| id | Integer | Primary Key, Auto Increment |
| name | String | Unique, Not Null |
| color | String | Not Null (Hex Code) |
| createdAt | DateTime | Not Null |
| updatedAt | DateTime | Not Null |

### 2. Todos
| Column | Type | Constraints |
| --- | --- | --- |
| id | Integer | Primary Key, Auto Increment |
| title | String | Not Null, Min 3 chars |
| description | Text | Nullable |
| completed | Boolean | Default: false |
| priority | Enum | 'LOW', 'MEDIUM', 'HIGH' |
| dueDate | Date | Nullable |
| categoryId | Integer | Foreign Key (Categories.id), Nullable |
| createdAt | DateTime | Not Null |
| updatedAt | DateTime | Not Null |

## 🚀 Getting Started

### Prerequisites
- Docker and Docker Compose installed on your machine.

### Installation & Run

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd industrix-fullstack-challenge
   ```

2. **Run using Docker Compose**
   ```bash
   docker-compose up --build -d
   ```

3. **Run Database Migrations & Seeds** (Optional)
   The migrations run automatically on startup, but you can manually seed the initial categories:
   ```bash
   docker exec industrix-backend npx sequelize-cli db:seed:all
   ```

4. **Run Unit Tests**
   To verify the API stability, run the tests:
   ```bash
   docker exec industrix-backend npm test
   ```

5. **Access the Application**
   - **Frontend**: [http://localhost:5173](http://localhost:5173)
   - **Backend API**: [http://localhost:5000/api](http://localhost:5000/api)

## 📡 API Documentation

### Todos
- `GET /api/todos` - Get all todos (supports search, filter by category, and pagination)
- `GET /api/todos/:id` - Get a specific todo
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/:id` - Update a todo
- `PATCH /api/todos/:id/toggle` - Toggle todo completion status
- `DELETE /api/todos/:id` - Delete a todo

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create a new category
- `DELETE /api/categories/:id` - Delete a category

## 🏛️ Project Architecture

The project follows a clean **Controller-Model-Route** architecture:

```text
├── backend/
│   ├── config/         # Database configuration
│   ├── controllers/    # Request handling & business logic
│   ├── middleware/     # Custom middlewares (Validation, etc)
│   ├── migrations/     # Sequelize DB migrations
│   ├── models/         # Sequelize models
│   ├── routes/         # API Route definitions
│   ├── tests/          # Unit & Integration tests
│   └── validations/    # Joi validation schemas
├── frontend/
│   ├── src/
│   │   ├── components/ # Reusable React components
│   │   ├── context/    # Global State Management
│   │   ├── services/   # API Integration layer
│   │   └── App.jsx     # Main layout & routing
└── docker-compose.yml  # Container orchestration
```
