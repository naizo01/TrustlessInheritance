import { useEffect } from "react";
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
    tokens: `0x${string}`[],
    onError?: (error: any) => void,
    onSuccessConfirm?: (data: any) => void,
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
  
    const writeFn = useWriteContract({
      mutation: {
        onError: onError,
      },
    });  
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

    useEffect(() => {
      if (waitFn.isSuccess) {
        onSuccessConfirm?.(waitFn.data);
      } else if (waitFn.isError) {
        onError?.(waitFn.error);
      }
    }, [waitFn.isSuccess, waitFn.isError]);
  
    return { waitFn, writeContract };
  }