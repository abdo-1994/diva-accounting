import React, { useState } from 'react';
import axios from 'axios';

export default function ExpenseForm({ expense, onDone }) {
  const isNew = !expense.id;
  const [type, setType] = useState(expense.type || '');
  const [date, setDate] = useState(expense.date || '');
  const [amount, setAmount] = useState(expense.amount || 0);

  const submit = () => {
    const payload = { type, date, amount };
    const req = isNew
      ? axios.post('/api/expenses', payload)
      : axios.put(`/api/expenses/${expense.id}`, payload);
    req.then(onDone);
  };

  return (
    <div className="modal">
      <h3>{isNew ? 'New' : 'Edit'} Expense</h3>
      <input value={type} onChange={e => setType(e.target.value)} placeholder="Type" />
      <input type="date" value={date} onChange={e => setDate(e.target.value)} />
      <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Amount" />
      <button onClick={submit}>Save</button>
      <button onClick={onDone}>Cancel</button>
    </div>
  );
}
