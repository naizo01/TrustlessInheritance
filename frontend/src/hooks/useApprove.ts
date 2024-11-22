import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
  useReadContract,
} from "wagmi";
import { erc20Abi } from "viem";

export type UseApproveReturn = {
  waitFn: ReturnType<typeof useWaitForTransactionReceipt>;
  readFn: ReturnType<typeof useReadContract>;
  writeContract: () => void;
};

export default function useApprove(
  sender: `0x${string}`,
  tokenAddress: `0x${string}`,
  amount?: bigint
): UseApproveReturn {
  const { chain, address: owner } = useAccount();

  const approveArgs: [`0x${string}`, bigint] = [sender, amount || BigInt(0)];
  const allowanceArgs: [`0x${string}`, `0x${string}`] = [
    owner || "0x0",
    sender,
  ];
  const isReady = owner && sender && chain;

  const config = {
    address: tokenAddress as `0x${string}`,
    abi: erc20Abi,
    functionName: "approve" as const,
    args: approveArgs,
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

  const readFn = useReadContract({
    address: tokenAddress as `0x${string}`,
    abi: erc20Abi,
    functionName: "allowance",
    args: allowanceArgs,
  });

  return { waitFn, readFn, writeContract };
}
