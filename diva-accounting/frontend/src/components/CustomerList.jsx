import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomerForm from './CustomerForm';

export default function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [editing, setEditing] = useState(null);

  useEffect(() => { axios.get('/api/customers').then(r=>setCustomers(r.data)); }, []);
  const refresh = () => axios.get('/api/customers').then(r=>setCustomers(r.data));

  return (
    <div>
      <h2>Customers</h2>
      <button onClick={()=>setEditing({})}>New Customer</button>
      <table>
        <thead><tr><th>Name</th><th>Email</th><th>Phone</th><th>Actions</th></tr></thead>
        <tbody>
          {customers.map(c=>(
            <tr key={c.id}>
              <td>{c.name}</td><td>{c.email}</td><td>{c.phone}</td>
              <td>
                <button onClick={()=>setEditing(c)}>Edit</button>
                <button onClick={()=>{axios.delete(`/api/customers/${c.id}`).then(refresh);}}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editing!==null && <CustomerForm customer={editing} onDone={()=>{setEditing(null);refresh();}} />}
    </div>
  );
}
