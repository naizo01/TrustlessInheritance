import React from "react";
import { assets } from "@/lib/token";
import useBalanceOf from "@/hooks/useBalanceOf";
import { useAccount } from "wagmi";
import { formatEther } from 'viem'

export default function TokenBalances() {
  const { address: userAddress } = useAccount();
  return (
    <div>
      <h2>Token Balances</h2>
      <ul>
        {assets.map((token) => {
          const { data: balance } = useBalanceOf(userAddress, token.address);
          return (
            <li key={token.symbol}>
              {token.name} ({token.symbol}):{" "}
              {balance ? formatEther(balance) : "0"}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
