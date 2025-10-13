import React, { useState } from 'react';
import { sendWithOfflineQueue } from '../offline/queue';
import useIndexedResource from '../hooks/useIndexedResource';

export default function PackageForm({ pkg, onDone }) {
  const isNew = !pkg.id;
  const [name, setName] = useState(pkg.name||'');
  const [desc, setDesc] = useState(pkg.description||'');
  const [price, setPrice] = useState(pkg.price||0);
  const [serviceIds, setServiceIds] = useState(pkg.items?.map(i=>i.service_id)||[]);
  const { data: services } = useIndexedResource({
    resource: 'services',
    url: '/api/services',
    initialData: [],
    transform: (payload) => (Array.isArray(payload) ? payload : []),
  });

  const submit = async () => {
    const payload = { name, description: desc, price, service_ids: serviceIds };
    const url = isNew ? '/api/packages' : `/api/packages/${pkg.id}`;
    const method = isNew ? 'post' : 'put';
    const result = await sendWithOfflineQueue({ url, method, data: payload });
    if (result.queued) {
      alert('تم حفظ التعديل بدون اتصال. سيتم المزامنة تلقائياً عند توفر الشبكة.');
      const offlineId = pkg.id ?? `offline-${Date.now()}`;
      onDone({ queued: true, draft: { id: offlineId, name, price, description: desc, service_ids: serviceIds } });
    } else {
      onDone({ queued: false, record: result.response?.data });
    }
  };

  return (
    <div className="modal">
      <h3>{isNew? 'New' : 'Edit'} Package</h3>
      <input value={name} onChange={e=>setName(e.target.value)} placeholder="Name" />
      <textarea value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Description" />
      <input type="number" value={price} onChange={e=>setPrice(e.target.value)} placeholder="Price" />
      <label>Services:</label>
      <select multiple value={serviceIds} onChange={e=>{
        setServiceIds(Array.from(e.target.selectedOptions).map(o=>+o.value));
      }}>
        {services.map(s=><option key={s.id} value={s.id}>{s.name}</option>)}
      </select>
      <button onClick={submit}>Save</button><button onClick={onDone}>Cancel</button>
    </div>
  );
}
