import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ExpenseForm from './ExpenseForm';

export default function ExpenseList() {
  const [expenses, setExpenses] = useState([]);
  const [editing, setEditing] = useState(null);

  useEffect(() => { axios.get('/api/expenses').then(r=>setExpenses(r.data)); }, []);
  const refresh = () => axios.get('/api/expenses').then(r=>setExpenses(r.data));

  return (
    <div>
      <h2>Expenses</h2>
      <button onClick={()=>setEditing({})}>New Expense</button>
      <table>
        <thead><tr><th>Type</th><th>Date</th><th>Amount</th><th>Actions</th></tr></thead>
        <tbody>
          {expenses.map(e=>(
            <tr key={e.id}>
              <td>{e.type}</td><td>{e.date}</td><td>{e.amount}</td>
              <td>
                <button onClick={()=>setEditing(e)}>Edit</button>
                <button onClick={()=>{axios.delete(`/api/expenses/${e.id}`).then(refresh);}}>Del</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editing!==null && (
        <ExpenseForm
          expense={editing}
          onDone={() => {
            setEditing(null);
            refresh();
          }}
        />
      )}
    </div>
  );
}
