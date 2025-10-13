import React from 'react';
import useIndexedResource from '../hooks/useIndexedResource';

export default function InvoiceList() {
  const { data: invoices, status } = useIndexedResource({
    resource: 'invoices',
    url: '/api/invoices',
    initialData: [],
    transform: (payload) => (Array.isArray(payload) ? payload : []),
  });
  return (
    <div>
      <h2>Invoices</h2>
      {status !== 'online' && <p className="offline-hint">يتم عرض الفواتير من ذاكرة IndexedDB.</p>}
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
