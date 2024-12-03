import { createPublicClient, http } from 'viem';
import { baseSepolia } from 'viem/chains';
import inheritanceFactoryAbi from "@/lib/abi/InheritanceFactory.json";
import { InheritanceFactory } from "@/lib/address";

export async function getProxyInfo(proxyAddress) {
  const apikey = process.env.NEXT_PUBLIC_ALCHEMY_ID;
  const publicClient = createPublicClient({
    chain: baseSepolia,
    transport: http(`https://base-sepolia.g.alchemy.com/v2/${apikey}`)
  });

  try {
    const proxyInfo = await publicClient.readContract({
      address: InheritanceFactory,
      abi: inheritanceFactoryAbi,
      functionName: "getProxyInfo",
      args: [proxyAddress],
    });

    return proxyInfo;
  } catch (error) {
    console.error("Error fetching proxy info:", error);
    throw error;
  }
}