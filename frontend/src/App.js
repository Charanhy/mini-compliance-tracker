import React, { useState } from "react";
import ClientList from "./components/ClientList";
import TaskList from "./components/TaskList";
import Login from "./components/Login";
import "./App.css";

function App() {
  const [selectedClient, setSelectedClient] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState("");

  const handleLogin = (username) => {
    setIsAuthenticated(true);
    setAdminUser(username);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAdminUser("");
    setSelectedClient(null);
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="logo-container">
          <span className="logo-icon">✓</span>
          <h1>Mini Compliance Tracker</h1>
        </div>
        <div className="user-profile">
          <span className="avatar">{adminUser.charAt(0).toUpperCase()}</span>
          <span className="user-name">{adminUser}</span>
          <button className="logout-btn" onClick={handleLogout} style={{ marginLeft: '15px', padding: '5px 10px', background: 'transparent', border: '1px solid white', color: 'white', borderRadius: '4px', cursor: 'pointer' }}>Logout</button>
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




