import { InheritanceFactory } from "@/lib/address";
import { parseAbiItem } from "viem";
import { createPublicClient, http } from "viem";
import { anvil, baseSepolia } from "viem/chains";

export default async function getProxyCreatedEvents() {
  const publicClient = createPublicClient({
    chain: baseSepolia,
    transport: http('https://sepolia.base.org') 
  });
  const abi = parseAbiItem("event ProxyCreated(address indexed,address, uint)")
  const filter = await publicClient.createEventFilter({
    address: InheritanceFactory,
    fromBlock: 18495330n, 
    event: abi,
  });
  const logs = await publicClient.getFilterLogs({ filter })
  console.log(logs);
  return logs;
}
