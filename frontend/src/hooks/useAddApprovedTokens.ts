import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import inheritanceContractAbi from "@/lib/abi/IInheritanceContract.json";

export type UseAddApprovedTokensReturn = {
  waitFn: ReturnType<typeof useWaitForTransactionReceipt>;
  writeContract: () => void;
};

export default function useAddApprovedTokens(
  contractAddress: `0x${string}`,
  tokens: `0x${string}`[]
): UseAddApprovedTokensReturn {
  const { chain, address: owner } = useAccount();
  const isReady = owner && contractAddress && chain;

  const config = {
    address: contractAddress,
    abi: inheritanceContractAbi,
    functionName: "addApprovedTokens" as const,
    args: [tokens],
    chain: chain,
  };

  const writeFn = useWriteContract();

  const writeContract = () => {
    if (isReady) {
      console.log("Executing writeContract with config:", config);
      try {
        writeFn.writeContract(config);
      } catch (error) {
        console.error("Error in writeContract:", error);
      }
    }
  };

  const waitFn = useWaitForTransactionReceipt({
    chainId: chain?.id,
    hash: writeFn?.data,
  });

  return { waitFn, writeContract };
}
