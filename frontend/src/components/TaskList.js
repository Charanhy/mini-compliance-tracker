import React, { useEffect, useState } from "react";

function TaskList({ clientId }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (clientId) {
      fetch(`http://localhost:5000/tasks/${clientId}`)
        .then(res => res.json())
        .then(data => setTasks(data));
    }
  }, [clientId]);

  const updateStatus = (id) => {
    fetch(`http://localhost:5000/tasks/${id}`, {
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

  return (
    <div>
      <h2>Tasks</h2>
      {tasks.map(task => (
        <div key={task.id} style={{
          border: "1px solid black",
          margin: "10px",
          padding: "10px",
          backgroundColor: isOverdue(task) ? "#ffcccc" : "white"
        }}>
          <h4>{task.title}</h4>
          <p>Status: {task.status}</p>
          <p>Due: {task.due_date}</p>

          {isOverdue(task) && <b style={{ color: "red" }}>Overdue</b>}

          <br />
          {task.status !== "Completed" && (
            <button onClick={() => updateStatus(task.id)}>Mark Completed</button>
          )}
        </div>
      ))}
    </div>
  );
}

export default TaskList;