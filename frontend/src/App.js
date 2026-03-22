import React, { useState } from "react";
import ClientList from "./components/ClientList";
import TaskList from "./components/TaskList";
import "./App.css";

function App() {
  const [selectedClient, setSelectedClient] = useState(null);

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="logo-container">
          <span className="logo-icon">✓</span>
          <h1>Mini Compliance Tracker</h1>
        </div>
        <div className="user-profile">
          <span className="avatar">A</span>
          <span className="user-name">Admin User</span>
        </div>
      </header>

      <main className="app-main">
        <aside className="app-sidebar">
          <ClientList onSelect={setSelectedClient} selectedClientId={selectedClient} />
        </aside>

        <section className="app-content">
          <TaskList clientId={selectedClient} />
        </section>
      </main>
    </div>
  );
}

export default App;


