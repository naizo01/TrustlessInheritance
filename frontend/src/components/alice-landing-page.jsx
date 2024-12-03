"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  Lock,
  UserCheck,
  FileText,
  Wallet,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Hourglass } from "lucide-react";
import dynamic from "next/dynamic";
import { isAddress } from "ethers";
import { useAccount } from "wagmi";
import getProxyCreatedEvents from "@/hooks/getProxyCreatedEvents";
import { getInheritanceState } from "@/hooks/getInheritanceState";
import { getProxyInfo } from "@/hooks/getProxyInfo";

import { Header } from "@/components/common/variable-header";
import { useAliceState, ALICE_ACTIONS } from "@/pages/alice";
import { usePosts } from "@/app/postContext";
import { assets as importedAssets } from "@/lib/token";

import useBalanceOf from "@/hooks/useBalanceOf";
import { setErrorConfig } from "viem";
import { formatEther, createPublicClient, http, formatUnits } from "viem";
import { baseGoerli } from "viem/chains";

// ABI for the balanceOf function of ERC20 tokens
const erc20ABI = [
  {
    constant: true,
    inputs: [{ name: "_owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "balance", type: "uint256" }],
    type: "function",
  },
];

// Create a public client for Base Sepolia
const client = createPublicClient({
  chain: {
    ...baseGoerli,
    id: 84532, // Base Sepolia chain ID
    name: "Base Sepolia",
    network: "base-sepolia",
    nativeCurrency: {
      decimals: 18,
      name: "Sepolia Ether",
      symbol: "ETH",
    },
    rpcUrls: {
      default: {
        http: ["https://sepolia.base.org"],
      },
      public: {
        http: ["https://sepolia.base.org"],
      },
    },
    blockExplorers: {
      default: {
        name: "Basescan",
        url: "https://sepolia.basescan.org",
      },
    },
    testnet: true,
  },
  transport: http(),
});

const steps = [
  {
    icon: Lock,
    iconColor: "bg-blue-100 text-blue-500",
    number: "1",
    title: "ウォレットの接続",
    description: "相続手続きを登録するために、ウォレットを接続します。",
  },
  {
    icon: UserCheck,
    iconColor: "bg-green-100 text-green-500",
    number: "2",
    title: "相続開始後のロック期間の設定",
    description: "相続資産の安全な移転のため、ロック期間を設定します。",
  },
  {
    icon: FileText,
    iconColor: "bg-purple-100 text-purple-500",
    number: "3",
    title: "相続人と共有する秘密情報の登録",
    description: "正当な相続人の証明に用いる、秘密情報を登録します。",
  },
  {
    icon: Wallet,
    iconColor: "bg-yellow-100 text-yellow-500",
    number: "4",
    title: "相続を許可する資産の選択",
    description: "ロック期間が終了し、取り出し可能となる資産を登録します。",
  },
];

function createTokenBalanceObject(proxyObject) {
  // トークンアドレスからシンボルへのマップを作成
  const addressToSymbol = Object.fromEntries(
    importedAssets.map((asset) => [asset.address.toLowerCase(), asset.symbol])
  );
  // トークンバランスオブジェクトを作成
  const tokenBalances = proxyObject.tokens.reduce(
    (acc, tokenAddress, index) => {
      const symbol = addressToSymbol[tokenAddress.toLowerCase()];
      if (symbol) {
        acc[symbol] = proxyObject.balances[index];
      }
      return acc;
    },
    {}
  );
  return {
    ...proxyObject,
    tokenBalances,
  };
}

function SubLandingPage() {
  const { state, dispatch } = useAliceState();
  const { address, isConnected } = useAccount();
  const [assetsInfo, setAssetsInfo] = useState({
    assets: [],
    lockPeriod: 0,
    lockEndDate: null,
  });
  const [isNextEnabled, setIsNextEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [proxies, setProxies] = useState([]);
  const [selectedProxy, setSelectedProxy] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [balances, setBalances] = useState({});

  // addressが取得できたら、proxy addressを取得する
  const fetchProxy = useCallback(async () => {
    if (isAddress(address)) {
      try {
        const logs = await getProxyCreatedEvents();
        return logs;
      } catch (err) {
        console.error("Failed to get events", err);
        throw err;
      }
    }
  }, [address]);

  // proxy addressが取得できたら、各proxyのstateを取得する
  const fetchStates = useCallback(
    async (events) => {
      const newStates = [];
      for (const event of events) {
        if (event.args[0] === address) {
          const state = await getProxyInfo(event.args[1]);
          const temp = {
            proxy: event.args[1],
            lockPeriod: state.lockDuration,
            lockEndDate: "",
            assets: createTokenBalanceObject(state),
          };
          newStates.push(temp);
        }
      }
      return newStates;
    },
    [address]
  );

  // walletが接続されたら、address、proxyを取得
  useEffect(() => {
    async function initializeData() {
      if (isConnected && isAddress(address)) {
        try {
          setIsLoading(true);
          setError(null);
          dispatch({
            type: ALICE_ACTIONS.SET_DECEASED_ADDRESS,
            payload: address,
          });
          const events = await fetchProxy();

          const newProxies = await fetchStates(events);
          console.log(newProxies);
          setProxies(newProxies);
          if (newProxies.length > 0) {
            setIsNextEnabled(true);
          }
        } catch (err) {
          setError("データの取得中にエラーが発生しました。");
          console.error(err);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsNextEnabled(false);
        setIsLoading(false);
      }
    }

    initializeData();
  }, [isConnected, address, dispatch, fetchProxy, fetchStates]);

  // data生成
  const fetchTokens = (tokens, lockPeriod = null, lockEndDate = null) => {
    const data = {
      assets: [],
      lockPeriod: lockPeriod,
      lockEndDate: lockEndDate,
    };

    Object.entries(tokens).forEach(([symbol, balance], index) => {
      const tokenMatched = importedAssets.find(
        (token) => token.symbol === symbol
      );
      if (tokenMatched) {
        data.assets.push({
          id: index + 1,
          logURL: tokenMatched.logoURL,
          name: tokenMatched.name,
          symbol: symbol,
          type: `${tokenMatched.type} トークン`,
          balance: formatEther(BigInt(balance)),
          value: formatEther(
            BigInt(balance) * BigInt(Math.round(tokenMatched.price))
          ),
          selected: false,
        });
      }
    });
    console.log("proxy:", data);
    return data;
  };

  // aliceのバランスを取得(Approveしていないtoken)
  useEffect(() => {
    async function fetchBalances() {
      if (!address) return;

      const newBalances = {};
      for (const token of importedAssets) {
        try {
          const balance = await client.readContract({
            address: token.address,
            abi: erc20ABI,
            functionName: "balanceOf",
            args: [address],
          });

          balance && (newBalances[token.symbol] = balance);
        } catch (error) {
          console.error(`Error fetching balance for ${token.symbol}:`, error);
          newBalances[token.symbol] = null;
        }
      }

      setBalances(newBalances);
    }

    fetchBalances();
  }, [address]);

  const handleProxySelect = (proxyAddress) => {
    console.log(proxyAddress);
    setSelectedProxy(proxyAddress);
    setIsDialogOpen(false);
    const proxyMatched = proxies.find((proxy) => proxy.proxy === proxyAddress);
    const proxy = fetchTokens(proxyMatched.assets.tokenBalances);
    dispatch({
      type: ALICE_ACTIONS.SET_ASSETS,
      payload: proxy,
    });

    ///// ページ変遷分岐を管理 /////
    dispatch({ type: ALICE_ACTIONS.SET_REGISTERED });
    // isLocked===trueで判断
    proxy.assets.isLocked && dispatch({ type: ALICE_ACTIONS.SET_SUBMITTED });
    wrapUp();
  };

  // 新規登録
  const handleNewRegistration = () => {
    dispatch({
      type: ALICE_ACTIONS.SET_ASSETS,
      payload: fetchTokens(balances),
    });
    console.log(fetchTokens(balances));
    wrapUp();
  };

  //　プロンプト表示、新規、既存の選択
  function handleNextStep() {
    setIsDialogOpen(true);
  }

  function wrapUp() {
    selectedProxy &&
      dispatch({
        type: ALICE_ACTIONS.SET_SELECTED_PROXY,
        payload: selectedProxy,
      });
    dispatch({ type: ALICE_ACTIONS.SET_PROXIES, payload: proxies });
    dispatch({ type: ALICE_ACTIONS.SET_DECEASED_ADDRESS, payload: address });
    dispatch({ type: ALICE_ACTIONS.MOVE_FORWARD });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex flex-col relative">
      <Header
        scrolled={false}
        scrollToSection={() => {}}
        appBadgeText="ウォレットの接続"
        appBadgeClassName="border-blue-500 text-blue-500"
      />
      {/* {isLoading && (
        <div className="absolute inset-0 bg-white/50 dark:bg-black/50  z-50 flex items-center justify-center">
          <Loader2 className="w-16 h-16 animate-spin text-blue-500" />
        </div>
      )} */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto pt-12"
      >
        <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0 my-4">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                被相続人の手続き
              </h1>
              <p className="text-lg text-gray-600">
                ZKプルーフを使用した安全な相続プロセス
              </p>
            </div>

            <div className="space-y-6">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className={`p-3 rounded-full ${step.iconColor}`}>
                    <step.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {step.number}. {step.title}
                    </h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 flex flex-col items-center space-y-4">
              {!isConnected && (
                <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 text-center bg-blue-50 dark:bg-blue-900 p-4 rounded-lg shadow-inner max-w-md">
                  画面上部の
                  <span className="font-semibold text-blue-600 dark:text-blue-400">
                    「Connect Wallet」
                  </span>
                  ボタンをクリックしてウォレットを接続してください。
                </p>
              )}
              <Button
                disabled={!isNextEnabled}
                onClick={handleNextStep}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-full text-lg font-semibold transition-all duration-200 ease-in-out transform hover:scale-105"
              >
                相続手続き登録の開始
                {isLoading ? (
                  <Hourglass className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <ArrowRight className="ml-2 w-6 h-6" />
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>プロキシーの選択</DialogTitle>
          </DialogHeader>
          <div className="mt-4 space-y-2">
            {proxies.map((proxy, index) => (
              <Button
                key={index}
                onClick={() => handleProxySelect(proxy.proxy)}
                className="w-full text-left justify-start"
                variant="outline"
              >
                {proxy.proxy}
              </Button>
            ))}
            <Button
              onClick={handleNewRegistration}
              className="w-full text-left justify-start"
              variant="default"
            >
              新規登録
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default dynamic(() => Promise.resolve(SubLandingPage), {
  ssr: false,
});
