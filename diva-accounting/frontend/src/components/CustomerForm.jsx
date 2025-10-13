import React, { useState } from 'react';
import { sendWithOfflineQueue } from '../offline/queue';

export default function CustomerForm({ customer, onDone }) {
  const isNew = !customer.id;
  const [name, setName] = useState(customer.name || '');
  const [email, setEmail] = useState(customer.email || '');
  const [phone, setPhone] = useState(customer.phone || '');

  const submit = async () => {
    const payload = { name, email, phone };
    const url = isNew ? '/api/customers' : `/api/customers/${customer.id}`;
    const method = isNew ? 'post' : 'put';
    const result = await sendWithOfflineQueue({ url, method, data: payload });
    if (result.queued) {
      alert('تم حفظ العميل بدون اتصال، وسيتم الإرسال لاحقاً تلقائياً.');
      const offlineId = customer.id ?? `offline-${Date.now()}`;
      onDone({ queued: true, draft: { id: offlineId, ...payload } });
    } else {
      onDone({ queued: false, record: result.response?.data });
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>{isNew ? 'New Customer' : 'Edit Customer'}</h3>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" />
        <div className="modal-actions">
          <button onClick={submit}>Save</button>
          <button onClick={() => onDone({ queued: false })}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

