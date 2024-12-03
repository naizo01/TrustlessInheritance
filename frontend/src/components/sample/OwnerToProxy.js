import React from "react";
import { useAccount } from "wagmi";
import useOwnerToProxy from "@/hooks/useOwnerToProxy";

export default function OwnerToProxy() {
  const { address: userAddress } = useAccount();
  const { data: proxyAddress, isLoading, error } = useOwnerToProxy(userAddress);
  console.log(proxyAddress)
  return (
    <div style={{ padding: '20px', borderRadius: '5px' }}>
      <h2 style={{ color: 'black' }}>Owner to Proxy</h2>
      {isLoading ? (
        <p style={{ color: 'black' }}>Loading...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>Error: {error.message}</p>
      ) : (
        <p style={{ color: 'black' }}>
          Proxy Address: {proxyAddress ? proxyAddress.toString() : "Not found"}
        </p>
      )}
    </div>
  );
}