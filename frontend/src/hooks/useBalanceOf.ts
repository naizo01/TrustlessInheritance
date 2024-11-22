import { useEffect } from "react";
import { useReadContract, useAccount } from "wagmi";
import { erc20Abi } from "viem";

export default function useBalanceOf(
  address?: `0x${string}`,
  tokenAddress?: `0x${string}`,
): ReturnType<
  typeof useReadContract<readonly unknown[], "balanceOf", readonly unknown[]>
> {
  const { address: accentAddress } = useAccount();
  const config = {
    address: tokenAddress as `0x${string}`,
    abi: erc20Abi,
  };
  const readFn = useReadContract<
    readonly unknown[],
    "balanceOf",
    readonly unknown[]
  >({
    ...config,
    functionName: "balanceOf",
    args: [address],
    query: {
      enabled: !!accentAddress,
    },
  });

  return readFn;
}
