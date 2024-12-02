import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import inheritanceContractAbi from "@/lib/abi/IInheritanceContract.json";

export type ZKProof = {
  _pA: [any, any];
  _pB: [[any, any], [any, any]];
  _pC: [any, any];
  _pubSignals: [any];
};

export type UseInitiateInheritanceReturn = {
  waitFn: ReturnType<typeof useWaitForTransactionReceipt>;
  writeContract: () => void;
};

export default function useInitiateInheritance(
  contractAddress: `0x${string}`,
  proof: any
): UseInitiateInheritanceReturn {
  const { chain, address: owner } = useAccount();
  // const isReady = owner && contractAddress && chain && 
  //   proof?._pA?.length === 2 && 
  //   proof?._pB?.length === 2 && 
  //   proof?._pC?.length === 2 && 
  //   proof?._pubSignals?.length === 1;

  // console.log("Validation check:", {
  //   hasOwner: !!owner,
  //   hasContract: !!contractAddress,
  //   hasChain: !!chain,
  //   proofValidation: {
  //     pALength: proof?._pA?.length,
  //     pBLength: proof?._pB?.length,
  //     pCLength: proof?._pC?.length,
  //     pubSignalsLength: proof?._pubSignals?.length
  //   }
  // });

  const config = {
    address: contractAddress,
    abi: inheritanceContractAbi,
    functionName: "initiateInheritance" as const,
    args: [{
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

  const writeContract = async () => {
    // if (!isReady) {
    //   console.error("Not ready to write contract. State:", {
    //     owner,
    //     contractAddress,
    //     chain,
    //     proofState: {
    //       pA: proof?._pA,
    //       pB: proof?._pB,
    //       pC: proof?._pC,
    //       pubSignals: proof?._pubSignals
    //     }
    //   });
    //   return;
    // }

    try {
      console.log("config.args",config.args)
      await writeFn.writeContract(config);
    } catch (error) {
      console.error("Contract write error:", error);
      throw error;
    }
  };

  const waitFn = useWaitForTransactionReceipt({
    chainId: chain?.id,
    hash: writeFn?.data,
  });

  return { waitFn, writeContract };
}