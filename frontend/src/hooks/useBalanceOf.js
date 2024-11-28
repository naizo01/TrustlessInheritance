import { useReadContract } from "wagmi";
import { erc20Abi } from "viem";

export default function useBalanceOf(address, tokenAddress) {
  const config = {
    address: tokenAddress,
    abi: erc20Abi,
  };
  const readFn = useReadContract({
    ...config,
    functionName: "balanceOf",
    args: [address],
    query: {
      enabled: !!address,
    },
  });
  return readFn;
}