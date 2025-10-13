import React, { useState } from 'react';
import CustomerForm from './CustomerForm';
import useIndexedResource from '../hooks/useIndexedResource';
import { sendWithOfflineQueue } from '../offline/queue';

export default function CustomerList() {
  const [editing, setEditing] = useState(null);
  const { data: customers, status, refetch, setData } = useIndexedResource({
    resource: 'customers',
    url: '/api/customers',
    initialData: [],
    transform: (payload) => (Array.isArray(payload) ? payload : []),
  });

  const refresh = () => refetch();

  const handleDelete = async (customerId) => {
    const result = await sendWithOfflineQueue({ url: `/api/customers/${customerId}`, method: 'delete' });
    if (result.queued) {
      alert('حذف العميل سيتم تنفيذه عند عودة الاتصال بالإنترنت.');
      setData((prev) => prev.filter((c) => c.id !== customerId));
    } else {
      refresh();
    }
  };

  return (
    <div>
      <h2>Customers</h2>
      {status !== 'online' && <p className="offline-hint">البيانات الحالية من النسخة المخزنة مؤقتاً.</p>}
      <button onClick={()=>setEditing({})}>New Customer</button>
      <table>
        <thead><tr><th>Name</th><th>Email</th><th>Phone</th><th>Actions</th></tr></thead>
        <tbody>
          {customers.map(c=>(
            <tr key={c.id}>
              <td>{c.name}</td><td>{c.email}</td><td>{c.phone}</td>
              <td>
                <button onClick={()=>setEditing(c)}>Edit</button>
                <button onClick={()=>handleDelete(c.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editing!==null && (
        <CustomerForm
          customer={editing}
          onDone={({ queued, draft }) => {
            setEditing(null);
            if (queued && draft) {
              setData((prev) => {
                const exists = prev.find((c) => c.id === draft.id);
                if (exists) {
                  return prev.map((c) => (c.id === draft.id ? draft : c));
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
