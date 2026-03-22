import React, { useState } from "react";
import API_URL from "../config";
import "./AddTask.css";

function AddTask({ clientId, onTaskAdded }) {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState("Tax");
  const [priority, setPriority] = useState("Medium");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !dueDate) {
      alert("Please provide both a title and a due date.");
      return;
    }

    setLoading(true);

    const newTask = {
      client_id: clientId,
      title,
      due_date: dueDate,
      category,
      priority,
      status: "Pending" // Default status
    };

    fetch(`${API_URL}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask)
    })
      .then(res => res.json())
      .then(() => {
        setLoading(false);
        setTitle("");
        setDueDate("");
        setCategory("Tax");
        setPriority("Medium");
        onTaskAdded(); // Refresh tasks list
      })
      .catch(err => {
        console.error("Error adding task:", err);
        setLoading(false);
      });
  };

  return (
    <div className="add-task-container">
      <h3>Add New Task</h3>
      <form onSubmit={handleSubmit} className="add-task-form">
        <div className="form-group">
          <label>Task Title</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            placeholder="e.g. GST Filing"
            required
          />
        </div>

        <div className="form-group">
          <label>Due Date</label>
          <input 
            type="date" 
            value={dueDate} 
            onChange={(e) => setDueDate(e.target.value)} 
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group half">
            <label>Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="Tax">Tax</option>
              <option value="Audit">Audit</option>
              <option value="Compliance">Compliance</option>
              <option value="Legal">Legal</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group half">
            <label>Priority</label>
            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>

        <button type="submit" disabled={loading} className="btn-primary">
          {loading ? "Adding..." : "Add Task"}
        </button>
      </form>
    </div>
  );
}

export default AddTask;


