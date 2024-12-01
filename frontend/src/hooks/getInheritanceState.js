import { createPublicClient, http } from 'viem';
import { baseSepolia } from 'viem/chains';
import inheritanceContractAbi from "@/lib/abi/IInheritanceContract.json";

export async function getInheritanceState(contractAddress) {
  const apikey = process.env.NEXT_PUBLIC_ALCHEMY_ID;
  const publicClient = createPublicClient({
    chain: baseSepolia,
    transport: http(`https://base-sepolia.g.alchemy.com/v2/${apikey}`)
  });

  const isLocked = await publicClient.readContract({
    address: contractAddress,
    abi: inheritanceContractAbi,
    functionName: "isLocked",
  });

  const isKilled = await publicClient.readContract({
    address: contractAddress,
    abi: inheritanceContractAbi,
    functionName: "isKilled",
  });

  const isLockExpired = await publicClient.readContract({
    address: contractAddress,
    abi: inheritanceContractAbi,
    functionName: "isLockExpired",
  });

  const isWithdrawComplete = await publicClient.readContract({
    address: contractAddress,
    abi: inheritanceContractAbi,
    functionName: "isWithdrawComplete",
  });

  return {
    isLocked,
    isKilled,
    isLockExpired,
    isWithdrawComplete,
  };
}