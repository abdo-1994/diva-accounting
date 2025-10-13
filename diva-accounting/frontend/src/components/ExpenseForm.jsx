import React, { useState } from 'react';
import { sendWithOfflineQueue } from '../offline/queue';

export default function ExpenseForm({ expense, onDone }) {
  const isNew = !expense.id;
  const [type, setType] = useState(expense.type || '');
  const [date, setDate] = useState(expense.date || new Date().toISOString().slice(0, 10));
  const [amount, setAmount] = useState(expense.amount || 0);

  const submit = async () => {
    const payload = { type, date, amount: Number(amount) };
    const url = isNew ? '/api/expenses' : `/api/expenses/${expense.id}`;
    const method = isNew ? 'post' : 'put';
    const result = await sendWithOfflineQueue({ url, method, data: payload });
    if (result.queued) {
      alert('تم حفظ المصروف للعمل دون اتصال. سيتم المزامنة تلقائياً.');
      const offlineId = expense.id ?? `offline-${Date.now()}`;
      onDone({ queued: true, draft: { id: offlineId, ...payload } });
    } else {
      onDone({ queued: false, record: result.response?.data });
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>{isNew ? 'New Expense' : 'Edit Expense'}</h3>
        <input value={type} onChange={(e) => setType(e.target.value)} placeholder="Type" />
        <input value={date} onChange={(e) => setDate(e.target.value)} type="date" />
        <input value={amount} onChange={(e) => setAmount(e.target.value)} type="number" min="0" step="0.01" placeholder="Amount" />
        <div className="modal-actions">
          <button onClick={submit}>Save</button>
          <button onClick={() => onDone({ queued: false })}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

