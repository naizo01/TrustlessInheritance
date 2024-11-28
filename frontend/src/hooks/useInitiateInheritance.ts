import {
    useAccount,
    useWriteContract,
    useWaitForTransactionReceipt,
  } from "wagmi";
  import inheritanceContractAbi from "@/lib/abi/IInheritanceContract.json";
  
  // ZKProofの型定義
  export type ZKProof = {
    pA: [bigint, bigint];
    pB: [[bigint, bigint], [bigint, bigint]];
    pC: [bigint, bigint];
    pubSignals: [bigint];
  };
  
  export type UseInitiateInheritanceReturn = {
    waitFn: ReturnType<typeof useWaitForTransactionReceipt>;
    writeContract: () => void;
  };
  
  export default function useInitiateInheritance(
    contractAddress: `0x${string}`,
    proof: ZKProof
  ): UseInitiateInheritanceReturn {
    const { chain, address: owner } = useAccount();
    const isReady = owner && contractAddress && chain;
  
    const config = {
      address: contractAddress,
      abi: inheritanceContractAbi,
      functionName: "initiateInheritance" as const,
      args: [proof],
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