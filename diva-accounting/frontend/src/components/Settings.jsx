import React from 'react';
import useIndexedResource from '../hooks/useIndexedResource';
import { sendWithOfflineQueue } from '../offline/queue';

export default function Settings() {
  const { data: settings, setData: setSettings, status: settingsStatus } = useIndexedResource({
    resource: 'settings',
    url: '/api/settings',
    initialData: {},
    transform: (payload) => (payload && typeof payload === 'object' ? payload : {}),
  });
  const { data: currencies } = useIndexedResource({
    resource: 'currencies',
    url: '/api/currencies',
    initialData: [],
    transform: (payload) => (Array.isArray(payload) ? payload : []),
  });

  const handleChange = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const save = async () => {
    const result = await sendWithOfflineQueue({ url: '/api/settings', method: 'post', data: settings });
    if (result.queued) {
      alert('تم حفظ التعديلات وستتم مزامنتها عند الاتصال بالإنترنت.');
    } else {
      alert('Saved');
    }
  };
  return (
    <div>
      <h2>Settings</h2>
      {settingsStatus !== 'online' && (
        <p className="offline-hint">يتم عرض الإعدادات من الذاكرة المحلية.</p>
      )}
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
