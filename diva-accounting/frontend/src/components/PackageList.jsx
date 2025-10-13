import React, { useState } from 'react';
import PackageForm from './PackageForm';
import useIndexedResource from '../hooks/useIndexedResource';
import { sendWithOfflineQueue } from '../offline/queue';

export default function PackageList() {
  const [editing, setEditing] = useState(null);
  const { data: packages, status, refetch, setData } = useIndexedResource({
    resource: 'packages',
    url: '/api/packages',
    initialData: [],
    transform: (payload) => (Array.isArray(payload) ? payload : []),
  });

  const refresh = () => refetch();

  const handleDelete = async (pkgId) => {
    const result = await sendWithOfflineQueue({ url: `/api/packages/${pkgId}`, method: 'delete' });
    if (result.queued) {
      alert('لا يوجد اتصال بالشبكة. تم جدولة عملية الحذف وسيتم تنفيذها عند توفر الاتصال.');
      setData((prev) => prev.filter((pkg) => pkg.id !== pkgId));
    } else {
      refresh();
    }
  };

  return (
    <div>
      <h2>Packages</h2>
      {status !== 'online' && <p className="offline-hint">عرض بيانات محفوظة في IndexedDB.</p>}
      <button onClick={()=>setEditing({})}>New Package</button>
      <table>
        <thead><tr><th>Name</th><th>Price</th><th>Actions</th></tr></thead>
        <tbody>
          {packages.map(pkg=>(
            <tr key={pkg.id}>
              <td>{pkg.name}</td><td>{pkg.price}</td>
              <td>
                <button onClick={()=>setEditing(pkg)}>Edit</button>
                <button onClick={()=>handleDelete(pkg.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editing!==null && (
        <PackageForm
          pkg={editing}
          onDone={({ queued, draft }) => {
            setEditing(null);
            if (queued && draft) {
              setData((prev) => {
                const exists = prev.find((p) => p.id === draft.id);
                if (exists) {
                  return prev.map((p) => (p.id === draft.id ? draft : p));
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
