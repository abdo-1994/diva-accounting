import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Settings() {
  const [settings, setSettings] = useState({});
  const [currencies, setCurrencies] = useState([]);
  useEffect(() => {
    axios.get('/api/settings').then(r=>setSettings(r.data));
    axios.get('/api/currencies').then(r=>setCurrencies(r.data));
  }, []);
  const handleChange = (k,v) => setSettings(prev => ({ ...prev, [k]: v }));
  const save = () => axios.post('/api/settings', settings).then(()=>alert('Saved'));
  return (
    <div>
      <h2>Settings</h2>
      <div><label>Company Name</label>
      <input value={settings.company_name||''} onChange={e=>handleChange('company_name', e.target.value)} /></div>
      <div><label>Default Currency</label>
      <select value={settings.default_currency||''} onChange={e=>handleChange('default_currency', e.target.value)}>
        {currencies.map(c=> <option key={c.code} value={c.code}>{c.name} ({c.code})</option>)}
      </select></div>
      <button onClick={save}>Save</button>
    </div>
  );
}
