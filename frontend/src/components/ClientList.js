import React, { useEffect, useState } from "react";
import API_URL from "../config";
import "./ClientList.css";

function ClientList({ onSelect, selectedClientId }) {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/clients`)
      .then(res => res.json())
      .then(data => setClients(data));
  }, []);

  return (
    <div className="client-list">
      <div className="client-list-header">
        <h2>Clients</h2>
      </div>
      <div className="client-items">
        {clients.map(client => (
          <div 
            key={client.id} 
            className={`client-item ${selectedClientId === client.id ? 'active' : ''}`}
            onClick={() => onSelect(client.id)}
          >
            <div className="client-icon">
              {client.company_name.charAt(0)}
            </div>
            <div className="client-info">
              <span className="client-name">{client.company_name}</span>
              <span className="client-type">{client.entity_type} • {client.country}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ClientList;