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
    contractAddress: `0x${string}`
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