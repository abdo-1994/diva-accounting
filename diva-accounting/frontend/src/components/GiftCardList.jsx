import React from 'react';
import useIndexedResource from '../hooks/useIndexedResource';

export default function GiftCardList() {
  const { data: cards, status } = useIndexedResource({
    resource: 'gift-cards',
    url: '/api/gift-cards',
    initialData: [],
    transform: (payload) => (Array.isArray(payload) ? payload : []),
  });
  return (
    <div>
      <h2>Gift Cards</h2>
      {status !== 'online' && <p className="offline-hint">عرض بطاقات الهدايا من بيانات مخزنة محلياً.</p>}
      <table>
        <thead><tr><th>Code</th><th>Balance</th><th>Expiry</th></tr></thead>
        <tbody>
          {cards.map(c=>(
            <tr key={c.id}>
              <td>{c.code}</td><td>{c.balance}</td><td>{c.expiry_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
