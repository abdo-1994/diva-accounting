import React, { useState } from 'react';
import UserForm from './UserForm';
import useIndexedResource from '../hooks/useIndexedResource';

export default function UserList() {
  const [editing, setEditing] = useState(null);
  const { data: users, status, refetch, setData } = useIndexedResource({
    resource: 'users',
    url: '/api/users',
    initialData: [],
    transform: (payload) => (Array.isArray(payload) ? payload : []),
  });
  const refresh = () => refetch();
  return (
    <div>
      <h2>Users</h2>
      {status !== 'online' && <p className="offline-hint">عرض نسخة مخزنة مؤقتاً من المستخدمين.</p>}
      <button onClick={()=>setEditing({})}>New User</button>
      <table>
        <thead><tr><th>Name</th><th>Email</th><th>Roles</th></tr></thead>
        <tbody>{users.map(u=>(
          <tr key={u.id}><td>{u.name}</td><td>{u.email}</td><td>{u.roles.map(r=>r.name).join(', ')}</td></tr>
        ))}</tbody>
      </table>
      {editing!==null && (
        <UserForm
          user={editing}
          onDone={({ queued, draft }) => {
            setEditing(null);
            if (queued && draft) {
              setData((prev) => {
                const exists = prev.find((u) => u.id === draft.id);
                if (exists) {
                  return prev.map((u) => (u.id === draft.id ? draft : u));
                }
                return [...prev, draft];
              });
            } else {
              refresh();
            }
          }}
        />
      )}
    </div>
  );
}
