import React, { useState, useEffect } from "react";
import getProxyCreatedEvents from "@/hooks/getProxyCreatedEvents";

const ProxyCreatedEventsList = () => {
  const [events, setEvents] = useState([]);
  const [states, setStates] = useState({});

  const handleCreateProxy = async () => {
    try {
      const logs = await getProxyCreatedEvents();
      setEvents(logs);
    } catch (error) {
      console.error("イベントの取得に失敗しました:", error);
    }
  };

  const styles = {
    container: {
      padding: "20px",
      borderRadius: "5px",
    },
    header: {
      color: "black",
    },
    button: {
      backgroundColor: "white",
      color: "black",
      border: "1px solid black",
      borderRadius: "5px",
      padding: "10px 20px",
      cursor: "pointer",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginTop: "20px",
    },
    th: {
      border: "1px solid black",
      padding: "10px",
      color: "black",
    },
    td: {
      border: "1px solid black",
      padding: "10px",
      color: "black",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Proxy Created Events</h1>
      <button onClick={handleCreateProxy} style={styles.button}>
        getProxyCreatedEvents
      </button>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>owner</th>
            <th style={styles.th}>proxy address</th>
            <th style={styles.th}>hush</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event, index) => (
            <tr key={index}>
              <td style={styles.td}>{event.args[0]}</td>
              <td style={styles.td}>{event.args[1]}</td>
              <td style={styles.td}>{event.args[2].toString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProxyCreatedEventsList;