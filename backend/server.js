const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

/* ---------------- SAMPLE DATA ---------------- */

let clients = [
  { id: 1, company_name: "ABC Pvt Ltd", country: "India", entity_type: "Private" },
  { id: 2, company_name: "XYZ Ltd", country: "USA", entity_type: "Corporation" }
];

let tasks = [
  {
    id: 1,
    client_id: 1,
    title: "GST Filing",
    category: "Tax",
    due_date: "2026-03-20",
    status: "Pending",
    priority: "High"
  }
];

/* ---------------- ROUTES ---------------- */

// ✅ THIS IS THE MISSING PART
app.get("/clients", (req, res) => {
  res.json(clients);
});

app.get("/tasks/:clientId", (req, res) => {
  const clientId = parseInt(req.params.clientId);
  const clientTasks = tasks.filter(t => t.client_id === clientId);
  res.json(clientTasks);
});

app.post("/tasks", (req, res) => {
  const newTask = {
    id: tasks.length + 1,
    ...req.body
  };
  tasks.push(newTask);
  res.json(newTask);
});

app.put("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const task = tasks.find(t => t.id === id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  task.status = req.body.status || task.status;

  res.json(task);
});

/* ---------------- SERVER ---------------- */

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});