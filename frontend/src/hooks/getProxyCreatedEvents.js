import { InheritanceFactory } from "@/lib/address";
import { parseAbiItem } from "viem";
import { createPublicClient, http } from "viem";
import { anvil, baseSepolia } from "viem/chains";

export default async function getProxyCreatedEvents() {
  const apikey = process.env.NEXT_PUBLIC_ALCHEMY_ID;
  const publicClient = createPublicClient({
    chain: baseSepolia,
    transport: http(`https://base-sepolia.g.alchemy.com/v2/${apikey}`),
  });
  const abi = parseAbiItem("event ProxyCreated(address indexed,address, uint)");
  const filter = await publicClient.createEventFilter({
    address: InheritanceFactory,
    fromBlock: 18495330n,
    event: abi,
  });
  const logs = await publicClient.getFilterLogs({ filter });
  console.log(logs);
  return logs;
}
