import { useEffect } from "react";
import {
    useAccount,
    useWriteContract,
    useWaitForTransactionReceipt,
  } from "wagmi";
  import inheritanceContractAbi from "@/lib/abi/IInheritanceContract.json";
  
  export type UseCancelInheritanceReturn = {
    waitFn: ReturnType<typeof useWaitForTransactionReceipt>;
    writeContract: () => void;
  };
  
  export default function useCancelInheritance(
    contractAddress: `0x${string}`,
    onError?: (error: any) => void,
    onSuccessConfirm?: (data: any) => void,
  ): UseCancelInheritanceReturn {
    const { chain, address: owner } = useAccount();
    const isReady = owner && contractAddress && chain;
  
    const config = {
      address: contractAddress,
      abi: inheritanceContractAbi,
      functionName: "cancelInheritance" as const,
      args: [],
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