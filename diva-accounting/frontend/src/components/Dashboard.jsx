import React from 'react';
import { Line } from 'react-chartjs-2';
import useIndexedResource from '../hooks/useIndexedResource';

export default function Dashboard() {
  const { data, status } = useIndexedResource({
    resource: 'dashboard',
    url: '/api/dashboard',
    initialData: { dailySales: 0, newCustomers: 0, weeklySales: [], topServices: [], activeGifts: 0 },
    transform: (payload) => ({
      dailySales: payload.dailySales ?? 0,
      newCustomers: payload.newCustomers ?? 0,
      weeklySales: Array.isArray(payload.weeklySales) ? payload.weeklySales : [],
      topServices: Array.isArray(payload.topServices) ? payload.topServices : [],
      activeGifts: payload.activeGifts ?? 0,
    }),
  });
  const chartData = {
    labels: data.weeklySales.map(ws => ws.day),
    datasets: [{ label: 'Weekly Sales', data: data.weeklySales.map(ws => ws.total), fill: false }]
  };
  return (
    <div>
      <h1>Dashboard</h1>
      {status !== 'online' && (
        <p className="offline-hint">عرض بيانات مخزنة مؤقتاً — سيتم المزامنة عند عودة الاتصال.</p>
      )}
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
