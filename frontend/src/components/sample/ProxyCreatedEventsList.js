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
    <div>
      <h1>Proxy Created Events</h1>
      <button onClick={handleCreateProxy}>getProxyCreatedEvents</button>
      <table>
        <thead>
          <tr>
            <th>owner</th>
            <th>proxy address</th>
            <th>hush</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event, index) => (
            <tr key={index}>
              <td>{event.args[0]}</td>
              <td>{event.args[1]}</td>
              <td>{event.args[2].toString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProxyCreatedEventsList;