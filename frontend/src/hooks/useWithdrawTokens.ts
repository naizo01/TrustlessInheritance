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
    proof: ZKProof
  ): UseWithdrawTokensReturn {
    const { chain, address: owner } = useAccount();
    const isReady = owner && contractAddress && chain && tokens.length === amounts.length;
  
    const config = {
      address: contractAddress,
      abi: inheritanceContractAbi,
      functionName: "withdrawTokens" as const,
      args: [tokens, amounts, proof],
      chain: chain,
    };
  
    const writeFn = useWriteContract();
  
    const writeContract = () => {
      if (isReady) writeFn.writeContract(config);
    };
  
    const waitFn = useWaitForTransactionReceipt({
      chainId: chain?.id,
      hash: writeFn?.data,
    });
  
    return { waitFn, writeContract };
  }