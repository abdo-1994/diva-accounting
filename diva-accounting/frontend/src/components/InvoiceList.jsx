import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function InvoiceList() {
  const [invoices, setInvoices] = useState([]);
  useEffect(() => { axios.get('/api/invoices').then(r=>setInvoices(r.data)); }, []);
  return (
    <div>
      <h2>Invoices</h2>
      <table>
        <thead><tr><th>ID</th><th>Date</th><th>Total</th><th>Actions</th></tr></thead>
        <tbody>
          {invoices.map(inv=>(
            <tr key={inv.id}>
              <td>{inv.id}</td><td>{inv.date}</td><td>{inv.total}</td>
              <td><a href={`/api/invoices/${inv.id}/pdf`} target="_blank">PDF</a></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
