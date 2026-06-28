# Task Tracker Application

A responsive, production-ready Task Tracker web application built using the MERN stack. The project is split into a React frontend (Vite) and an Express-based Node.js backend API, connected to MongoDB Atlas.

It implements clean RESTful design patterns, form validation, real-time statistics dashboarding, advanced filtering/sorting, and centralizes error handling using the `node-utils-kit` package.

---

## Technical Stack & Libraries

### Frontend
- **React.js (Vite)**: Component-based reactive user interface.
- **Vanilla CSS**: Premium, responsive dashboard design utilizing modern HSL design tokens, micro-animations, and fluid grid layouts.
- **Lucide React**: Lightweight vector iconography.

### Backend
- **Node.js & Express.js**: RESTful API service using ES Modules syntax.
- **MongoDB & Mongoose**: Database mapping schemas, enforcing data types, and running model-level validations.
- **node-utils-kit**: Centralized utility package utilized for:
  - Wrapping asynchronous routes (`asyncHandler`) to catch errors without manual try-catch boilerplate.
  - Formulating standardized JSON success structures (`ApiResponse`).
  - Initiating structured, code-based errors (`ApiError`).
  - Executing global error middleware translation (`errorHandler`).

---

## Core Features

- **CRUD Operations**: Create tasks, view detail listings, modify details/status, or delete entries.
- **Dynamic Updates**: Tasks update state instantly in the browser without requiring a page refresh.
- **Live Workspace Statistics**: An inline statistics grid showing real-time counters for:
  - Total Tasks
  - Completed Tasks
  - In-Progress Tasks
  - Pending Tasks
  - Overdue Tasks (automatically evaluated against client date).
- **Advanced Filters & Sorting**:
  - Full-text search (matches titles or descriptions).
  - Status filters (All / Pending / In Progress / Completed).
  - Priority badges (All / Low / Medium / High).
  - Sort by date created, due date, or title (with ascending/descending toggle).
- **Form Validation**: Strict client-side validation for titles and description lengths before requests hit the network, matched with backend schema validations.
- **Slide-in Toasts**: Toast notification queue displaying success/warning/error feedback for user actions.

---

## Project Structure

```
Coll-Edge/
├── backend/
│   ├── src/
│   │   ├── db/
│   │   │   └── db.js                 # Database connection handler
│   │   ├── models/
│   │   │   └── Task.js               # Mongoose schema definitions
│   │   ├── controllers/
│   │   │   └── taskController.js     # Express request/response controllers
│   │   ├── routes/
│   │   │   └── taskRouter.js         # API endpoint routes mapping
│   │   ├── app.js                    # Middlewares, CORS config & error handler
│   │   └── index.js                  # Entry point (DB connection & listener)
│   ├── .env.example                  # Environment configuration template
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx            # Dynamic header
    │   │   ├── DashboardStats.jsx    # Metrics grid component
    │   │   ├── TaskForm.jsx          # Creation/editing form
    │   │   ├── TaskFilters.jsx       # Query control panel
    │   │   ├── TaskItem.jsx          # Individual task card
    │   │   └── Notification.jsx      # Slide-in toast alerts
    │   ├── App.jsx                   # Global state coordinator
    │   ├── main.jsx                  # React DOM mount point
    │   ├── api.js                    # Fetch wrapper to communicate with backend
    │   ├── index.css                 # CSS variables, resets & animations
    │   └── App.css                   # Responsive layout stylesheet
    ├── index.html
    ├── vite.config.js                # Vite configurations & dev proxy
    └── package.json
```

---

## Local Setup Instructions

### Prerequisites
- Node.js installed (v18+ recommended)
- A running MongoDB instance (local or MongoDB Atlas cluster)

### 1. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```
3. Set your connection string in `.env`:
   ```env
   PORT=5001
   MONGODB_URI=mongodb+srv://your-user:your-pass@cluster.mongodb.net/tasktracker
   CORS_ORIGIN=http://localhost:5173
   ```
4. Install dependencies:
   ```bash
   npm install
   ```
5. Run the server in development mode:
   ```bash
   npm run dev
   ```

### 2. Frontend Setup
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open your browser and go to `http://localhost:5173`.
