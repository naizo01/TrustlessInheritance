import { useEffect } from "react";
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import inheritanceFactoryAbi from "@/lib/abi/InheritanceFactory.json";
import { InheritanceFactory } from "@/lib/address";

export type UseCreateProxyReturn = {
  waitFn: ReturnType<typeof useWaitForTransactionReceipt>;
  writeContract: () => void;
};

export default function useCreateProxy(
  lockTime: bigint,
  proof: any,
  onError?: (error: any) => void,
  onSuccessConfirm?: (data: any) => void,
): UseCreateProxyReturn {
  const { chain, address: owner } = useAccount();
  const factoryAddress = InheritanceFactory;
  const isReady = owner && factoryAddress && chain;

  const config = {
    address: factoryAddress as `0x${string}`,
    abi: inheritanceFactoryAbi,
    functionName: "createProxy" as const,
    args: [lockTime,{
      pA: proof?._pA || [0n, 0n],
      pB: proof?._pB || [[0n, 0n], [0n, 0n]],
      pC: proof?._pC || [0n, 0n],
      pubSignals: proof?._pubSignals || [0n]
    }],
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

  return { waitFn, writeContract};
}