import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function GiftCardList() {
  const [cards, setCards] = useState([]);
  useEffect(() => { axios.get('/api/gift-cards').then(r=>setCards(r.data)); }, []);
  return (
    <div>
      <h2>Gift Cards</h2>
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
