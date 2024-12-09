import { useEffect } from "react";
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import MockTokenAbi from "@/lib/abi/MockToken.json";

export type UseMintReturn = {
  waitFn: ReturnType<typeof useWaitForTransactionReceipt>;
  writeContract: () => void;
};

export default function useMint(
  contractAddress: `0x${string}`,
  amount: number,
  onError?: (error: any) => void,
  onSuccessConfirm?: (data: any) => void,
): UseMintReturn {
  const { chain, address: owner } = useAccount();
  const isReady = owner && contractAddress && chain;

  const config = {
    address: contractAddress as `0x${string}`,
    abi: MockTokenAbi,
    functionName: "mint" as const,
    args: [owner as `0x${string}`, amount],
    chain: chain,
  };

  const writeFn = useWriteContract({
    mutation: {
      onError: onError,
    },
  });

  const writeContract = () => {
    if (isReady) writeFn.writeContract(config);
  };

  const waitFn = useWaitForTransactionReceipt({
    chainId: chain?.id,
    hash: writeFn?.data,
  });

  useEffect(() => {
    if (waitFn.isSuccess) {
      onSuccessConfirm?.(waitFn.data);
    } else if (waitFn.isError) {
      onError?.(waitFn.error);
    }
  }, [waitFn.isSuccess, waitFn.isError]);

  return { waitFn, writeContract };
}