import React, { useEffect, useState, useCallback } from "react";
import AddTask from "./AddTask";
import API_URL from "../config";
import "./TaskList.css";

function TaskList({ clientId }) {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState(null);
  
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("due_date");
  const [sortOrder, setSortOrder] = useState("asc");

  const fetchTasks = useCallback(() => {
    if (clientId) {
      const queryParams = new URLSearchParams();
      if (search) queryParams.append("search", search);
      if (sortField) {
        queryParams.append("sort", sortField);
        queryParams.append("order", sortOrder);
      }

      fetch(`${API_URL}/tasks/${clientId}?${queryParams.toString()}`)
        .then(res => res.json())
        .then(data => setTasks(data))
        .catch(err => console.error("Error fetching tasks:", err));

      fetch(`${API_URL}/tasks/stats/${clientId}`)
        .then(res => res.json())
        .then(data => setStats(data))
        .catch(err => console.error("Error fetching stats:", err));
    }
  }, [clientId, search, sortField, sortOrder]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const updateStatus = (id) => {
    fetch(`${API_URL}/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "Completed" })
    })
    .then(res => res.json())
    .then(() => {
      fetchTasks();
    })
    .catch(err => console.error("Error updating status:", err));
  };

  const isOverdue = (task) => {
    return task.status === "Pending" && new Date(task.due_date) < new Date();
  };

  const categories = ["All", ...new Set(tasks.map(t => t.category).filter(Boolean))];

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
      {stats && (
        <div className="dashboard-summary">
          <div className="stat-card">
            <h3>Total Tasks</h3>
            <p className="stat-number">{stats.total}</p>
          </div>
          <div className="stat-card">
            <h3>Pending</h3>
            <p className="stat-number pending">{stats.pending}</p>
          </div>
          <div className="stat-card">
            <h3>Completed</h3>
            <p className="stat-number completed">{stats.completed}</p>
          </div>
          <div className="stat-card">
            <h3>Overdue</h3>
            <p className="stat-number overdue">{stats.overdue}</p>
          </div>
        </div>
      )}

      <AddTask clientId={clientId} onTaskAdded={fetchTasks} />

      <div className="tasks-header">
        <h2>Tasks</h2>
        
        <div className="filters">
          <div className="filter-group search-bar">
            <input 
              type="text" 
              placeholder="Search tasks..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="filter-group">
            <select value={sortField} onChange={e => setSortField(e.target.value)}>
              <option value="due_date">Sort Date</option>
              <option value="priority">Sort Priority</option>
            </select>
            <select value={sortOrder} onChange={e => setSortOrder(e.target.value)}>
              <option value="asc">Asc</option>
              <option value="desc">Desc</option>
            </select>
          </div>

          <div className="filter-group">
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="filter-group">
            <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat === "All" ? "All Categories" : cat}</option>
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