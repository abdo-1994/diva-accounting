import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PackageForm from './PackageForm';

export default function PackageList() {
  const [packages, setPackages] = useState([]);
  const [editing, setEditing] = useState(null);

  useEffect(() => { axios.get('/api/packages').then(r=>setPackages(r.data)); }, []);
  const refresh = () => axios.get('/api/packages').then(r=>setPackages(r.data));

  return (
    <div>
      <h2>Packages</h2>
      <button onClick={()=>setEditing({})}>New Package</button>
      <table>
        <thead><tr><th>Name</th><th>Price</th><th>Actions</th></tr></thead>
        <tbody>
          {packages.map(pkg=>(
            <tr key={pkg.id}>
              <td>{pkg.name}</td><td>{pkg.price}</td>
              <td>
                <button onClick={()=>setEditing(pkg)}>Edit</button>
                <button onClick={()=>{axios.delete(`/api/packages/${pkg.id}`).then(refresh);}}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editing!==null && <PackageForm pkg={editing} onDone={()=>{setEditing(null);refresh();}} />}
    </div>
  );
}
