import React, { useEffect, useState } from "react";

function ClientList({ onSelect }) {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/clients")
      .then(res => res.json())
      .then(data => setClients(data));
  }, []);

  return (
    <div>
      <h2>Clients</h2>
      {clients.map(client => (
        <div key={client.id} onClick={() => onSelect(client.id)} style={{ cursor: "pointer" }}>
          {client.company_name}
        </div>
      ))}
    </div>
  );
}

export default ClientList;