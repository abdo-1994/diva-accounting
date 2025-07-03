import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserForm from './UserForm';

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [editing, setEditing] = useState(null);
  useEffect(() => { axios.get('/api/users').then(r=>setUsers(r.data)); }, []);
  const refresh = () => axios.get('/api/users').then(r=>setUsers(r.data));
  return (
    <div>
      <h2>Users</h2>
      <button onClick={()=>setEditing({})}>New User</button>
      <table>
        <thead><tr><th>Name</th><th>Email</th><th>Roles</th></tr></thead>
        <tbody>{users.map(u=>(
          <tr key={u.id}><td>{u.name}</td><td>{u.email}</td><td>{u.roles.map(r=>r.name).join(', ')}</td></tr>
        ))}</tbody>
      </table>
      {editing!==null && <UserForm user={editing} onDone={()=>{setEditing(null);refresh();}} />}
    </div>
  );
}
