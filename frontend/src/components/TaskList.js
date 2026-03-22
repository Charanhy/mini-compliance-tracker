import React, { useEffect, useState } from "react";
import AddTask from "./AddTask";
import API_URL from "../config";
import "./TaskList.css";

function TaskList({ clientId }) {
  const [tasks, setTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const fetchTasks = () => {
    if (clientId) {
      fetch(`${API_URL}/tasks/${clientId}`)
        .then(res => res.json())
        .then(data => setTasks(data));
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [clientId]);

  const updateStatus = (id) => {
    fetch(`${API_URL}/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "Completed" })
    })
    .then(res => res.json())
    .then(() => {
      setTasks(tasks.map(t => t.id === id ? { ...t, status: "Completed" } : t));
    });
  };

  const isOverdue = (task) => {
    return task.status === "Pending" && new Date(task.due_date) < new Date();
  };

  // Extract unique categories for the filter dropdown
  const categories = ["All", ...new Set(tasks.map(t => t.category).filter(Boolean))];

  // Apply filters
  const filteredTasks = tasks.filter(task => {
    const matchStatus = statusFilter === "All" || task.status === statusFilter;
    const matchCategory = categoryFilter === "All" || task.category === categoryFilter;
    return matchStatus && matchCategory;
  });

  if (!clientId) {
    return <div className="no-client-selected">Select a client from the sidebar to view their tasks.</div>;
  }

  return (
    <div className="task-list-container">
      <AddTask clientId={clientId} onTaskAdded={fetchTasks} />

      <div className="tasks-header">
        <h2>Tasks</h2>
        
        <div className="filters">
          <div className="filter-group">
            <label>Status:</label>
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
              <option value="All">All</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Category:</label>
            <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {filteredTasks.length === 0 ? (
        <p className="no-tasks">No tasks found matching the current filters.</p>
      ) : (
        <div className="tasks-grid">
          {filteredTasks.map(task => (
            <div key={task.id} className={`task-card ${isOverdue(task) ? "overdue" : ""}`}>
              <div className="task-card-header">
                <h4>{task.title}</h4>
                <span className={`status-badge ${task.status.toLowerCase()}`}>{task.status}</span>
              </div>
              
              <div className="task-details">
                <p><strong>Category:</strong> {task.category || "N/A"}</p>
                <p><strong>Priority:</strong> <span className={`priority ${task.priority?.toLowerCase() || 'medium'}`}>{task.priority || "Medium"}</span></p>
                <p><strong>Due:</strong> {new Date(task.due_date).toLocaleDateString()}</p>
              </div>

              {isOverdue(task) && <div className="overdue-warning">⚠ Overdue</div>}

              {task.status !== "Completed" && (
                <button className="btn-complete" onClick={() => updateStatus(task.id)}>
                  Mark Completed
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TaskList;