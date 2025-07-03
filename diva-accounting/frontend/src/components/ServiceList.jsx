import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ServiceList() {
  const [services, setServices] = useState([]);
  useEffect(() => { axios.get('/api/services').then(r=>setServices(r.data)); }, []);
  return (
    <div>
      <h2>Services</h2>
      <table>
        <thead><tr><th>Name</th><th>Category</th><th>Price</th></tr></thead>
        <tbody>
          {services.map(s=>(
            <tr key={s.id}><td>{s.name}</td><td>{s.category}</td><td>{s.price}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
