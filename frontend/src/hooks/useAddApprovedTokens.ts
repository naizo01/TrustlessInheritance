import {
    useAccount,
    useWriteContract,
    useWaitForTransactionReceipt,
  } from "wagmi";
  import inheritanceFactoryAbi from "@/lib/abi/InheritanceFactory.json";
  import { InheritanceFactory } from "@/lib/address";
  
  export type UseAddApprovedTokensReturn = {
    waitFn: ReturnType<typeof useWaitForTransactionReceipt>;
    writeContract: () => void;
  };
  
  export default function useAddApprovedTokens(
    tokens: `0x${string}`[]
  ): UseAddApprovedTokensReturn {
    const { chain, address: owner } = useAccount();
    const factoryAddress = InheritanceFactory;
    const isReady = owner && factoryAddress && chain;
  
    const config = {
      address: factoryAddress as `0x${string}`,
      abi: inheritanceFactoryAbi,
      functionName: "addApprovedTokens" as const,
      args: [tokens],
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