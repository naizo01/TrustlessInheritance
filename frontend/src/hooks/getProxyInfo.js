import { createPublicClient, http } from "viem";
import { baseSepolia } from "viem/chains";
import inheritanceFactoryAbi from "@/lib/abi/InheritanceFactory.json";
import { InheritanceFactory } from "@/lib/address";
import { assets } from "@/lib/token";

export async function getProxyInfo(proxyAddress) {
  const apikey = process.env.NEXT_PUBLIC_ALCHEMY_ID;
  const publicClient = createPublicClient({
    chain: baseSepolia,
    transport: http(`https://base-sepolia.g.alchemy.com/v2/${apikey}`),
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

export function convertToDummyTransaction(data, index = 1) {
  const lockStartTime = Number(data.lockStartTime);
  const lockDuration = Number(data.lockDuration);
  return {
    id: index, // ユニークなIDを生成する関数を使用
    proxyAddress: data.proxyAddress,
    ownerAddress: data.owner,
    tokens: convertTokens(data.tokens, data.balances),
    tokenAddresses: convertTokenAddress(data.tokens),
    loclSrartDate: lockStartTime ? lockStartTime * 1000 : null,
    lockEndDate: lockStartTime
      ? calculateLockEndDate(lockStartTime, lockDuration) * 1000
      : null,
    lockPeriod: lockDuration,
    secret: String(data.hash),
    isLocked: data.isLocked,
    isKilled: data.isKilled,
    isLockExpired: data.isLockExpired,
    isWithdrawComplete: data.isWithdrawComplete,
  };
}

// tokensとbalancesを変換するためのヘルパー関数
function convertTokens(tokens, balances) {
  const tokenMap = {};
  tokens.forEach((tokenAddress, index) => {
    const asset = assets.find(
      (asset) => asset.address.toLowerCase() === tokenAddress.toLowerCase()
    );
    if (asset) {
      tokenMap[asset.symbol] = String(balances[index]);
    }
  });
  return tokenMap;
}

// tokensとbalancesを変換するためのヘルパー関数
function convertTokenAddress(tokens) {
  const tokenMap = {};
  tokens.forEach((tokenAddress, index) => {
    const asset = assets.find(
      (asset) => asset.address.toLowerCase() === tokenAddress.toLowerCase()
    );
    if (asset) {
      tokenMap[asset.symbol] = tokenAddress;
    }
  });
  return tokenMap;
}

// lockEndDateを計算するためのヘルパー関数
function calculateLockEndDate(lockStartTime, lockDuration) {
  return lockStartTime + lockDuration;
}
