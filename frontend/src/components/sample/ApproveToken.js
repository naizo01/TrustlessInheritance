import React, { useState } from "react";
import { useAccount } from "wagmi";
import useApprove from "@/hooks/useApprove";
import { assets } from "@/lib/token";

export default function ApproveToken() {
  const { address: userAddress } = useAccount();
  const [selectedToken, setSelectedToken] = useState(assets[0]);
  const [approveAddress, setApproveAddress] = useState("");

  // uint256の最大値
  const maxUint256 = BigInt(
    "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
  );

  const { writeContract, waitFn, readFn } = useApprove(
    approveAddress || "0x5E4D21133Ff33327db9edfE879edf3Acc45e7330",
    selectedToken.address,
    maxUint256
  );

  const handleApprove = () => {
    if (approveAddress) {
      writeContract();
    } else {
      alert("Please enter a valid address to approve.");
    }
  };

  const getButtonText = () => {
    if (!userAddress) return "Connect Wallet";
    if (waitFn.isLoading) return "Processing...";
    if (waitFn.isSuccess) return "Approved!";
    if (waitFn.isError) return "Retry";
    return "Approve";
  };

  return (
    <div style={{ padding: "20px", borderRadius: "5px" }}>
      <h2 style={{ color: "black" }}>Approve Token</h2>
      <div>
        <label style={{ color: "black" }}>
          Select Token:
          <select
            value={selectedToken.symbol}
            onChange={(e) =>
              setSelectedToken(
                assets.find((token) => token.symbol === e.target.value)
              )
            }
            style={{
              color: "black",
              backgroundColor: "white",
              border: "1px solid black",
              borderRadius: "3px",
              padding: "5px",
            }}
          >
            {assets.map((token) => (
              <option key={token.symbol} value={token.symbol}>
                {token.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <label style={{ color: "black" }}>
          Approve Address:
          <input
            type="text"
            value={approveAddress}
            onChange={(e) => setApproveAddress(e.target.value)}
            placeholder="Enter address"
            style={{
              color: "black",
              backgroundColor: "white",
              border: "1px solid black",
              borderRadius: "3px",
              padding: "5px",
            }}
          />
        </label>
      </div>
      <button
        onClick={handleApprove}
        disabled={!userAddress || waitFn.isLoading}
        style={{
          backgroundColor: "white",
          color: "black",
          border: "1px solid black",
          borderRadius: "5px",
          padding: "10px 20px",
          cursor: "pointer",
        }}
      >
        {getButtonText()}
      </button>
      {waitFn.isLoading && (
        <p style={{ color: "black" }}>Transaction is being processed...</p>
      )}
      {waitFn.isSuccess && (
        <p style={{ color: "black" }}>Transaction successful!</p>
      )}
      {waitFn.isError && (
        <p style={{ color: "black" }}>Transaction failed. Please try again.</p>
      )}
      <div>
        <h3 style={{ color: "black" }}>Current Allowance</h3>
        <p style={{ color: "black" }}>
          {readFn.data ? readFn.data.toString() : 0}
        </p>
      </div>
    </div>
  );
}
