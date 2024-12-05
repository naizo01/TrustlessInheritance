import React from "react";
import { assets } from "@/lib/token";
import useBalanceOf from "@/hooks/useBalanceOf";
import { useAccount } from "wagmi";
import { formatEther } from 'viem'

export default function TokenBalances() {
  const { address: userAddress } = useAccount();
  const { data: balances } = useBalanceOf(userAddress, assets);

  return (
    <div style={{ padding: '20px', borderRadius: '5px' }}>
      <h2 style={{ color: 'black' }}>Token Balances</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {assets.map((token, index) => {
          const balance = balances ? balances[index] : null;
          const scanLink = `https://sepolia.basescan.org/address/${token.address}#writeContract`;
          return (
            <li key={token.symbol} style={{ color: 'black', border: '1px solid black', borderRadius: '3px', padding: '10px', marginBottom: '5px' }}>
              <a href={scanLink} target="_blank" rel="noopener noreferrer" style={{ color: 'blue', textDecoration: 'underline' }}>
                scan
              </a>{" "}
              {token.name} ({token.symbol}):{" "}
              {balance && balance.result ? formatEther(balance.result) : "0"}{" "}
              </li>
          );
        })}
      </ul>
    </div>
  );
}