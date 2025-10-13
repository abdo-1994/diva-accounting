import React from 'react';
import useIndexedResource from '../hooks/useIndexedResource';

export default function ServiceList() {
  const { data: services, status } = useIndexedResource({
    resource: 'services',
    url: '/api/services',
    initialData: [],
    transform: (payload) => (Array.isArray(payload) ? payload : []),
  });
  return (
    <div>
      <h2>Services</h2>
      {status !== 'online' && <p className="offline-hint">البيانات من النسخة المخزنة محلياً.</p>}
      <table>
        <thead><tr><th>Name</th><th>Category</th><th>Price</th></tr></thead>
        <tbody>
          {services.map(s=>(
            <tr key={s.id}><td>{s.name}</td><td>{s.category}</td><td>{s.price}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
