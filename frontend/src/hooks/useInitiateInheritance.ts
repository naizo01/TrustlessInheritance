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
  
    // デバッグログ
    console.log("useInitiateInheritance inputs:", {
      contractAddress,
      proof,
      owner,
      chain,
      isReady
    });
  
    const config = {
      address: contractAddress as `0x${string}`,
      abi: inheritanceContractAbi,
      functionName: "initiateInheritance" as const,
      args: [proof],
      chain: chain,
    };
  
    const writeFn = useWriteContract();
  
    // デバッグログ
    console.log("Write function config:", config);
    console.log("WriteFn state:", writeFn);
  
    const writeContract = () => {
      console.log("WriteContract called, isReady:", isReady);
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