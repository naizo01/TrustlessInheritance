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

export function convertToDummyTransaction(data) {
  const lockStartTime = Number(data.lockStartTime);
  const lockDuration = Number(data.lockDuration);
  return {
    id: 1, // ユニークなIDを生成する関数を使用
    address: data.proxyAddress,
    tokens: convertTokens(data.tokens, data.balances),
    lockEndDate: lockStartTime ? calculateLockEndDate(lockStartTime, lockDuration) : null,
    lockPeriod: Number(data.lockDuration),
    secret: data.hash,
    isLocked: data.isLocked,
    isKilled: data.isKilled,
    isLockExpired: data.isLockExpired,
    isWithdrawComplete: data.isWithdrawComplete,
  };
}

// ユニークなIDを生成するためのヘルパー関数
function generateUniqueId() {
  return Math.floor(Math.random() * 1000000); // 簡単な例としてランダムなIDを生成
}

// tokensとbalancesを変換するためのヘルパー関数
function convertTokens(tokens, balances) {
  const tokenMap = {};
  tokens.forEach((token, index) => {
    tokenMap[token] = balances[index];
  });
  return tokenMap;
}

// lockEndDateを計算するためのヘルパー関数
function calculateLockEndDate(lockStartTime, lockDuration) {
  const startDate = new Date(lockStartTime * 1000); // UNIXタイムスタンプをミリ秒に変換
  startDate.setMonth(startDate.getMonth() + lockDuration);
  return startDate;
}