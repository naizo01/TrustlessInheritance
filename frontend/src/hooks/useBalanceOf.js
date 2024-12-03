import { useReadContracts } from "wagmi";
import { erc20Abi } from "viem";

export default function useBalanceOf(address, assets) {
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

  return result;
}