import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function PackageForm({ pkg, onDone }) {
  const isNew = !pkg.id;
  const [name, setName] = useState(pkg.name||'');
  const [desc, setDesc] = useState(pkg.description||'');
  const [price, setPrice] = useState(pkg.price||0);
  const [serviceIds, setServiceIds] = useState(pkg.items?.map(i=>i.service_id)||[]);
  const [services, setServices] = useState([]);

  useEffect(()=>{ axios.get('/api/services').then(r=>setServices(r.data)); },[]);

  const submit = () => {
    const payload = { name, description: desc, price, service_ids: serviceIds };
    const req = isNew
      ? axios.post('/api/packages', payload)
      : axios.put(`/api/packages/${pkg.id}`, payload);
    req.then(onDone);
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
