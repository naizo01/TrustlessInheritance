import React, { useState } from "react";
import { getProxyInfo } from "@/hooks/getProxyInfo";
import { getProxyInfoByHash } from "@/hooks/getProxyInfoByHash";

function stringifyProxyInfo(info) {
  return JSON.stringify(info, (key, value) =>
    typeof value === "bigint" ? value.toString() : value
  );
}

export default function ProxyInfo() {
  const [proxyAddress, setProxyAddress] = useState("");
  const [hash, setHash] = useState("");
  const [proxyInfo, setProxyInfo] = useState(null);
  const [error, setError] = useState(null);

  const handleGetProxyInfo = async () => {
    try {
      const info = await getProxyInfo(proxyAddress);
      setProxyInfo(info);
      setError(null);
    } catch (err) {
      setError("Error fetching proxy info.");
      setProxyInfo(null);
    }
  };

  const handleGetProxyInfoByHash = async () => {
    try {
      const info = await getProxyInfoByHash(hash);
      setProxyInfo(info);
      setError(null);
    } catch (err) {
      setError("Error fetching proxy info by hash.");
      setProxyInfo(null);
    }
  };

  return (
    <div style={{ padding: "20px", borderRadius: "5px" }}>
      <h2 style={{ color: "black" }}>Proxy Info Tester</h2>
      <div>
        <label style={{ color: "black" }}>
          Proxy Address:
          <input
            type="text"
            value={proxyAddress}
            onChange={(e) => setProxyAddress(e.target.value)}
            placeholder="Enter proxy address"
            style={{
              color: "black",
              backgroundColor: "white",
              border: "1px solid black",
              borderRadius: "3px",
              padding: "5px",
            }}
          />
        </label>
        <button
          onClick={handleGetProxyInfo}
          style={{
            backgroundColor: "white",
            color: "black",
            border: "1px solid black",
            borderRadius: "5px",
            padding: "10px 20px",
            cursor: "pointer",
            marginLeft: "10px",
          }}
        >
          Get Proxy Info
        </button>
      </div>
      <div>
        <label style={{ color: "black" }}>
          Hash:
          <input
            type="text"
            value={hash}
            onChange={(e) => setHash(e.target.value)}
            placeholder="Enter hash"
            style={{
              color: "black",
              backgroundColor: "white",
              border: "1px solid black",
              borderRadius: "3px",
              padding: "5px",
            }}
          />
        </label>
        <button
          onClick={handleGetProxyInfoByHash}
          style={{
            backgroundColor: "white",
            color: "black",
            border: "1px solid black",
            borderRadius: "5px",
            padding: "10px 20px",
            cursor: "pointer",
            marginLeft: "10px",
          }}
        >
          Get Proxy Info by Hash
        </button>
      </div>
      {proxyInfo && (
        <pre style={{ color: "black" }}>
          {JSON.stringify(
            proxyInfo,
            (_, v) => (typeof v === "bigint" ? v.toString() : v),
            2
          )}
        </pre>
      )}
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
}
