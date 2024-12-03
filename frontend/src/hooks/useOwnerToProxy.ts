import { useReadContract } from "wagmi";
import inheritanceFactoryAbi from "@/lib/abi/InheritanceFactory.json";
import { InheritanceFactory } from "@/lib/address";

export default function useOwnerToProxy(
  address: `0x${string}`
): ReturnType<typeof useReadContract> {
  const factoryAddress = InheritanceFactory;

  const readFn = useReadContract({
    address: factoryAddress as `0x${string}`,
    abi: inheritanceFactoryAbi,
    functionName: "getOwnerProxies",
    args: [address],
  });

  return readFn;
}
