import React, { useState } from 'react';
import { sendWithOfflineQueue } from '../offline/queue';

export default function UserForm({ user, onDone }) {
  const isNew = !user.id;
  const [name, setName] = useState(user.name || '');
  const [email, setEmail] = useState(user.email || '');
  const [password, setPassword] = useState('');
  const [rolesText, setRolesText] = useState(Array.isArray(user.roles) ? user.roles.map((r) => r.name).join(',') : '');

  const submit = async () => {
    const roles = rolesText
      .split(',')
      .map((r) => r.trim())
      .filter(Boolean);
    const payload = { name, email, roles };
    if (password) {
      payload.password = password;
    }
    const url = isNew ? '/api/users' : `/api/users/${user.id}`;
    const method = isNew ? 'post' : 'put';
    const result = await sendWithOfflineQueue({ url, method, data: payload });
    if (result.queued) {
      alert('تم حفظ المستخدم دون اتصال بالشبكة وسيتم الإرسال لاحقاً.');
      const offlineId = user.id ?? `offline-${Date.now()}`;
      onDone({ queued: true, draft: { id: offlineId, name, email, roles: roles.map((name) => ({ name })) } });
    } else {
      onDone({ queued: false, record: result.response?.data });
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>{isNew ? 'New User' : 'Edit User'}</h3>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
        <textarea
          value={rolesText}
          onChange={(e) => setRolesText(e.target.value)}
          placeholder="Roles (comma separated)"
        />
        <div className="modal-actions">
          <button onClick={submit}>Save</button>
          <button onClick={() => onDone({ queued: false })}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

