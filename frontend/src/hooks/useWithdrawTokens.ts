import {
    useAccount,
    useWriteContract,
    useWaitForTransactionReceipt,
  } from "wagmi";
  import inheritanceContractAbi from "@/lib/abi/IInheritanceContract.json";
  
  // ZKProofの型定義
  export type ZKProof = {
    pA: [any, any];
    pB: [[any, any], [any, any]];
    pC: [any, any];
    pubSignals: [any];
  };
  
  export type UseWithdrawTokensReturn = {
    waitFn: ReturnType<typeof useWaitForTransactionReceipt>;
    writeContract: () => void;
  };
  
  export default function useWithdrawTokens(
    contractAddress: `0x${string}`,
    tokens: `0x${string}`[],
    amounts: bigint[],
    proof: any
  ): UseWithdrawTokensReturn {
    const { chain, address: owner } = useAccount();
    const isReady = owner && contractAddress && chain && tokens.length === amounts.length;
  
    const config = {
      address: contractAddress,
      abi: inheritanceContractAbi,
      functionName: "withdrawTokens" as const,
      args: [tokens, amounts, {
        pA: proof?._pA || [0n, 0n],
        pB: proof?._pB || [[0n, 0n], [0n, 0n]],
        pC: proof?._pC || [0n, 0n],
        pubSignals: proof?._pubSignals || [0n]
      }],
      chain: chain,
    };
  
    const writeFn = useWriteContract({
      mutation: {
        onError: (error) => {
          console.error("Error writing contract:", error);
        },
      },
    });  
    const writeContract = () => {
      console.log("config.args",config.args)
      if (isReady) writeFn.writeContract(config);
    };
  
    const waitFn = useWaitForTransactionReceipt({
      chainId: chain?.id,
      hash: writeFn?.data,
    });
  
    return { waitFn, writeContract };
  }