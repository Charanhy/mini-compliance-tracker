# Mini Compliance Tracker

A comprehensive web application for managing compliance tasks (like tax filings, audits, etc.) for multiple clients. Built as part of a Full Stack Developer Intern assignment.

## Features List

- **Client Management:** View a list of clients and select a client to view their compliance tasks.
- **Task Management:** View tasks for a selected client, add new tasks, and mark them as completed. 
- **Task Form:** Create tasks with flexible fields including Title, Due Date, Category, and Priority.
- **Advanced Filtering:** Filter tasks by current status (All, Pending, Completed) and by dynamically generated Categories.
- **Overdue Tracking:** Highlight tasks dynamically in the UI when they are pending and past their due date.
- **Modern UI/UX:** A robust, responsive, layout utilizing CSS styling for sidebars, filtering mechanisms, customized scrollbars, and dynamic badges representing priorities.

## Tech Stack Used

### Frontend
- **React.js** (Functional Components, Hooks like `useState`, `useEffect`)
- **JavaScript (ES6)**
- **CSS3** (Rich, modern variable-based layout, CSS Flexbox/Grid)
- **Fetch API** for seamless backend communication.

### Backend
- **Node.js** & **Express.js** 
- **RESTful APIs** providing standardized JSON endpoints.
- **CORS** middleware integrated.

### Storage
- **In-memory Variables:** Used deliberately to maintain simplicity for the assignment context, without spinning up an external database. 

## Assumptions

- **Single-User System:** No authentication or role-based access control is required. 
- **Data Persistence:** Data is stored in-memory on the backend server, meaning resetting or redeploying the backend will reset data back to the default seeding values.
- **Timezone Handling:** Simple date strings are used for `due_date`, compared against the user's local browser time for overdue estimations.

## Trade-offs

- **No Database:** To keep the assignment lightweight and fast to review, a DB connection (like MongoDB/PostgreSQL) was traded for simple JS arrays. 
- **Basic Error Handling:** Standard alert validations are used on the frontend to prioritize feature completeness over comprehensive form libraries (e.g., Formik/Yup).
- **Pagination Missing:** All clients and tasks are loaded at once. In a production system with millions of rows, infinite scrolling or pagination would be implemented.

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### 1. Backend Setup
1. Open a terminal and navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server (runs on `http://localhost:5000` by default):
   ```bash
   npm start
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
3. Start the React development server (runs on `http://localhost:3000`):
   ```bash
   npm start
   ```

## Deployment

This project is prepared for immediate deployment using Render and Vercel.

**Render (Backend):**
1. Connect this repository to your Render account.
2. Select the `backend` directory as the root.
3. Use `npm install` for the Build Command and `npm start` for the Start Command.

**Vercel (Frontend):**
1. Connect the repository to your Vercel account.
2. Ensure Vercel detects Create React App (`npm run build`).
3. Set an **Environment Variable** named `REACT_APP_API_URL` pointing to your shiny new Render backend URL (e.g., `https://my-backend.onrender.com`).
4. Click Deploy. (A `vercel.json` is included to handle any potential React Router rewrite issues natively).


