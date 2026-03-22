# Mini Compliance Tracker

A comprehensive web application for managing compliance tasks (like tax filings, audits, etc.) for multiple clients.


## 🌐 Live Demo

Frontend: https://mini-compliance-tracker-peach.vercel.app
Backend API: https://mini-compliance-tracker-tuly.onrender.com


## 📌 Project Overview

This application helps teams efficiently manage compliance tasks across multiple clients.  
Users can track deadlines, update task statuses, filter tasks, and easily identify overdue items.

The project is built as a **full-stack application** using React (frontend), Node.js (backend), and MongoDB (database).

---

## Features List

- **Admin Authentication Gate:** A secure React-based login portal that protects the dashboard from unauthorized access. Includes live API authentication handling and dynamic logout features.
- **Dashboard Summary:** View total, pending, completed, and overdue tasks at a glance.
- **Client Management:** View a list of clients and select a client to view their compliance tasks.
- **Task Management:** View tasks for a selected client, add new tasks, and mark them as completed. 
- **Task Form:** Create tasks with flexible fields including Title, Due Date, Category, and Priority.
- **Search & Sort:** Search tasks by title or category, and sort by due date or priority.
- **Advanced Filtering:** Filter tasks by current status (All, Pending, Completed) and by dynamically generated Categories.
- **Overdue Tracking:** Highlight tasks dynamically in the UI when they are pending and past their due date.
- **Modern UI/UX:** A robust, responsive layout utilizing CSS styling for sidebars, filtering mechanisms, customized scrollbars, and dynamic badges representing priorities.

## Tech Stack Used

### Frontend
- **React.js** (Functional Components, Hooks like `useState` and `useEffect`)
- **JavaScript (ES6)**
- **CSS3** (Flexbox/Grid layout, modern styling)
- **Fetch API** for seamless backend communication.

### Backend
- **Node.js** & **Express.js** 
- **RESTful APIs** based on the MVC pattern (Controllers, Routes, Models).
- **CORS** middleware integrated.
- **Dotenv** for environment variable management securely.

### Database
- **MongoDB** cluster via **Mongoose** (Replaced previous in-memory storage for scale and permanent data persistence).

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB Instance (Local or Atlas)

### 1. Backend Setup
1. Open a terminal and navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure your `.env` file:
   ```env
   PORT=5000
   MONGO_URI=mongodb+srv://<your-username>:<your-password>@cluster0.mongodb.net/compliance?retryWrites=true&w=majority
   ```
4. Seed the database with sample Data:
   ```bash
   node seed.js
   ```
5. Start the server (runs on `http://localhost:5000` by default):
   ```bash
   node server.js
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
3. Start the React development server:
   ```bash
   npm start
   ```

## Demo Credentials
Once the app is running on `http://localhost:3000`, use the following to bypass the Admin Login Gate:
- **Username:** `admin`
- **Password:** `admin123`

## Deployment

This project is prepared for immediate deployment using Render and Vercel.

**Render (Backend):**
1. Connect this repository to your Render account.
2. Select the `backend` directory as the root.
3. Use `npm install` for the Build Command and `node server.js` for the Start Command.
4. Add Environment Variables: `PORT` and `MONGO_URI`.

**Vercel (Frontend):**
1. Connect the repository to your Vercel account.
2. Ensure Vercel detects Create React App (`npm run build`).
3. Set an **Environment Variable** named `REACT_APP_API_URL` pointing to your Render backend URL (e.g., `https://my-backend.onrender.com`).
4. Click Deploy. (A `vercel.json` is included to natively handle React SPA routing locally on Vercel's edge network).




