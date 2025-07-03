import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

export default function Dashboard() {
  const [data, setData] = useState({dailySales:0,newCustomers:0,weeklySales:[],topServices:[],activeGifts:0});
  useEffect(() => { axios.get('/api/dashboard').then(r=>setData(r.data)); }, []);
  const chartData = {
    labels: data.weeklySales.map(ws => ws.day),
    datasets: [{ label: 'Weekly Sales', data: data.weeklySales.map(ws => ws.total), fill: false }]
  };
  return (
    <div>
      <h1>Dashboard</h1>
      <div className="kpis">
        <div><h3>Daily Sales</h3><p>{data.dailySales.toFixed(2)}</p></div>
        <div><h3>New Customers</h3><p>{data.newCustomers}</p></div>
        <div><h3>Active Gift Cards</h3><p>{data.activeGifts}</p></div>
      </div>
      <Line data={chartData} />
      <h3>Top Services</h3>
      <ul>{data.topServices.map((s,i)=><li key={i}>{s.name} ({s.count})</li>)}</ul>
    </div>
  );
}
