import React, { useState } from "react";
import ClientList from "./components/ClientList";
import TaskList from "./components/TaskList";

function App() {
  const [selectedClient, setSelectedClient] = useState(null);

  return (
    <div style={{ display: "flex", padding: "20px" }}>
      
      <div style={{ width: "30%" }}>
        <ClientList onSelect={setSelectedClient} />
      </div>

      <div style={{ width: "70%" }}>
        <TaskList clientId={selectedClient} />
      </div>

    </div>
  );
}

export default App;