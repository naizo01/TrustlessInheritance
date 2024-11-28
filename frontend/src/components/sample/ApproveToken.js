import React, { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import useApprove from "@/hooks/useApprove";
import { assets } from "@/lib/token";

export default function ApproveToken() {
  const { address: userAddress } = useAccount();
  const [selectedToken, setSelectedToken] = useState(assets[0]);

  // uint256の最大値
  const maxUint256 = BigInt("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");

  const { writeContract, waitFn, readFn } = useApprove(
    "0x5E4D21133Ff33327db9edfE879edf3Acc45e7330",
    selectedToken.address,
    maxUint256
  );

  const handleApprove = () => {
    writeContract();
  };

  const getButtonText = () => {
    if (!userAddress) return "Connect Wallet";
    if (waitFn.isLoading) return "Processing...";
    if (waitFn.isSuccess) return "Approved!";
    if (waitFn.isError) return "Retry";
    return "Approve";
  };

  return (
    <div>
      <h2>Approve Token</h2>
      <div>
        <label>
          Select Token:
          <select
            value={selectedToken.symbol}
            onChange={(e) =>
              setSelectedToken(
                assets.find((token) => token.symbol === e.target.value)
              )
            }
          >
            {assets.map((token) => (
              <option key={token.symbol} value={token.symbol}>
                {token.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <button onClick={handleApprove} disabled={!userAddress || waitFn.isLoading}>
        {getButtonText()}
      </button>
      {waitFn.isLoading && <p>Transaction is being processed...</p>}
      {waitFn.isSuccess && <p>Transaction successful!</p>}
      {waitFn.isError && <p>Transaction failed. Please try again.</p>}
      <div>
        <h3>Current Allowance</h3>
        <p>{readFn.data ? readFn.data.toString(): 0}</p>
      </div>
    </div>
  );
}