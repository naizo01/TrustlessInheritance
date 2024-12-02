import React, { useState, useEffect } from "react";
import getProxyCreatedEvents from "@/hooks/getProxyCreatedEvents";
import { getInheritanceState } from '@/hooks/getInheritanceState';

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

  useEffect(() => {
    const fetchStates = async () => {
      const newStates = {};
      for (const event of events) {
        const proxyAddress = event.args[1];
        const state = await getInheritanceState(proxyAddress);
        console.log(state)
        newStates[proxyAddress] = state;
      }
      setStates(newStates);
    };

    if (events.length > 0) {
      fetchStates();
    }
  }, [events]);

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
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>proxy address</th>
            <th style={styles.th}>isLocked</th>
            <th style={styles.th}>isKilled</th>
            <th style={styles.th}>isLockExpired</th>
            <th style={styles.th}>isWithdrawComplete</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event, index) => {
            const proxyAddress = event.args[1];
            const state = states[proxyAddress] || {};
            return (
              <tr key={index}>
                <td style={styles.td}>{proxyAddress}</td>
                <td style={styles.td}>{state.isLocked ? "Yes" : "No"}</td>
                <td style={styles.td}>{state.isKilled ? "Yes" : "No"}</td>
                <td style={styles.td}>{state.isLockExpired ? "Yes" : "No"}</td>
                <td style={styles.td}>{state.isWithdrawComplete ? "Yes" : "No"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ProxyCreatedEventsList;