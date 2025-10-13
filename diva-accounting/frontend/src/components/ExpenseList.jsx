import React, { useState } from 'react';
import ExpenseForm from './ExpenseForm';
import useIndexedResource from '../hooks/useIndexedResource';
import { sendWithOfflineQueue } from '../offline/queue';

export default function ExpenseList() {
  const [editing, setEditing] = useState(null);
  const { data: expenses, status, refetch, setData } = useIndexedResource({
    resource: 'expenses',
    url: '/api/expenses',
    initialData: [],
    transform: (payload) => (Array.isArray(payload) ? payload : []),
  });
  const refresh = () => refetch();

  const handleDelete = async (expenseId) => {
    const result = await sendWithOfflineQueue({ url: `/api/expenses/${expenseId}`, method: 'delete' });
    if (result.queued) {
      alert('تمت جدولة حذف المصروف عند عودة الاتصال.');
      setData((prev) => prev.filter((e) => e.id !== expenseId));
    } else {
      refresh();
    }
  };

  return (
    <div>
      <h2>Expenses</h2>
      {status !== 'online' && <p className="offline-hint">المصروفات معروضة من النسخة غير المتصلة.</p>}
      <button onClick={()=>setEditing({})}>New Expense</button>
      <table>
        <thead><tr><th>Type</th><th>Date</th><th>Amount</th><th>Actions</th></tr></thead>
        <tbody>
          {expenses.map(e=>(
            <tr key={e.id}>
              <td>{e.type}</td><td>{e.date}</td><td>{e.amount}</td>
              <td>
                <button onClick={()=>setEditing(e)}>Edit</button>
                <button onClick={()=>handleDelete(e.id)}>Del</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editing!==null && (
        <ExpenseForm
          expense={editing}
          onDone={({ queued, draft }) => {
            setEditing(null);
            if (queued && draft) {
              setData((prev) => {
                const exists = prev.find((e) => e.id === draft.id);
                if (exists) {
                  return prev.map((e) => (e.id === draft.id ? draft : e));
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
