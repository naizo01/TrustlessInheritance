import React, { useState } from 'react';
import getProxyCreatedEvents from '@/hooks/getProxyCreatedEvents';

const ProxyCreatedEventsList = () => {
  const [events, setEvents] = useState([]);

  const handleCreateProxy = async () => {
    try {
      const logs = await getProxyCreatedEvents();
      setEvents(logs);
    } catch (error) {
      console.error("イベントの取得に失敗しました:", error);
    }
  };

  return (
    <div style={{ padding: '20px', borderRadius: '5px' }}>
      <h1 style={{ color: 'black' }}>Proxy Created Events</h1>
      <button 
        onClick={handleCreateProxy} 
        style={{ backgroundColor: 'white', color: 'black', border: '1px solid black', borderRadius: '5px', padding: '10px 20px', cursor: 'pointer' }}
      >
        getProxyCreatedEvents
      </button>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid black', padding: '10px', color: 'black' }}>owner</th>
            <th style={{ border: '1px solid black', padding: '10px', color: 'black' }}>proxy address</th>
            <th style={{ border: '1px solid black', padding: '10px', color: 'black' }}>hush</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event, index) => (
            <tr key={index}>
              <td style={{ border: '1px solid black', padding: '10px', color: 'black' }}>{event.args[0]}</td>
              <td style={{ border: '1px solid black', padding: '10px', color: 'black' }}>{event.args[1]}</td>
              <td style={{ border: '1px solid black', padding: '10px', color: 'black' }}>{event.args[2].toString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProxyCreatedEventsList;