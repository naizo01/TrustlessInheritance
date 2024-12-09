import { useEffect } from "react";
import { useReadContracts } from "wagmi";
import { erc20Abi } from "viem";
import { usePosts } from "@/app/postContext";

export default function useBalanceOf(address, assets) {
  const { refresh } = usePosts();
  const contracts = assets.map((token) => ({
    address: token.address,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: [address],
  }));

  const result = useReadContracts({
    contracts,
    query: {
      enabled: !!address,
    },
  });

  useEffect(() => {
    result.refetch();
  }, [refresh]);

  return result;
}