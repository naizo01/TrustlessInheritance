import { useEffect } from "react";
import { useReadContract, useAccount } from "wagmi";
import { erc20Abi } from "viem";

export default function useBalanceOf(address, tokenAddress) {
  const { address: accentAddress } = useAccount();
  const config = {
    address: tokenAddress,
    abi: erc20Abi,
  };
  const readFn = useReadContract({
    ...config,
    functionName: "balanceOf",
    args: [address],
    query: {
      enabled: !!accentAddress,
    },
  });

  return readFn;
}