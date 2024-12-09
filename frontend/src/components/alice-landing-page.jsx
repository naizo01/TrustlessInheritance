"use client";

import React, { useState, useEffect } from "react";
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
  DialogDescription,
} from "@/components/ui/dialog";
import dynamic from "next/dynamic";
import { isAddress } from "ethers";
import { useAccount } from "wagmi";
import { Header } from "@/components/common/variable-header";
import { useAliceState, ALICE_ACTIONS } from "@/pages/alice";
import { usePosts } from "@/app/postContext";
import { assets as importedAssets } from "@/lib/token";

function SubLandingPage() {
  const { state, dispatch } = useAliceState();
  const { address, isConnected } = useAccount();
  const [isNextEnabled, setIsNextEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { wallet, network } = usePosts();

  const trimData = (tokens) => {
    const data = {
      assets: [],
      lockPeriod: tokens?.lockPeriod || null,
      lockEndDate: tokens?.lockEndDate || null,
    };

    Object.entries(tokens.tokens).forEach(([symbol, balance], index) => {
      const tokenMatched = importedAssets.find(
        (token) => token.symbol === symbol
      );
      if (tokenMatched && balance > 0) {
        data.assets.push({
          id: index + 1,
          logURL: tokenMatched.logoURL,
          name: tokenMatched.name,
          address: tokenMatched.address,
          symbol: symbol,
          type: `${tokenMatched.type} トークン`,
          balance: balance / 10 ** tokenMatched.decimals,
          value: (balance * tokenMatched.price) / 10 ** tokenMatched.decimals,
          selected: false,
        });
      }
    });
    return data;
  };

  useEffect(() => {
    if (isConnected && isAddress(address)) {
      dispatch({ type: ALICE_ACTIONS.SET_DECEASED_ADDRESS, payload: address });
      setIsLoading(false);
      setIsNextEnabled(true);
    } else {
      setIsNextEnabled(false);
      setIsLoading(false);
    }
  }, [isConnected, address, dispatch, network]);

  function handleNextStep() {
    network.length > 0 ? setIsDialogOpen(true) : handleNewRegistration();
  }

  const handleNewRegistration = () => {
    dispatch({
      type: ALICE_ACTIONS.SET_ASSETS,
      payload: trimData(wallet[0]),
    });
    wrapUp();
  };

  const handleProxySelect = (proxyAddress) => {
    setIsDialogOpen(false);
    const proxyMatched = network.find(
      (proxy) => proxy.proxyAddress === proxyAddress
    );
    dispatch({
      type: ALICE_ACTIONS.SET_ASSETS,
      payload: trimData(proxyMatched),
    });

    dispatch({ type: ALICE_ACTIONS.SET_PROXY_ADDRESS, payload: proxyAddress });

    wrapUp();

    dispatch({ type: ALICE_ACTIONS.SET_REGISTERED });
    proxyMatched.isLocked && dispatch({ type: ALICE_ACTIONS.SET_SUBMITTED });
  };

  const wrapUp = () => {
    dispatch({ type: ALICE_ACTIONS.SET_DECEASED_ADDRESS, payload: address });
    dispatch({ type: ALICE_ACTIONS.MOVE_FORWARD });
  };

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex flex-col relative">
      <Header
        scrolled={false}
        scrollToSection={() => {}}
        appBadgeText="ウォレットの接続"
        appBadgeClassName="border-blue-500 text-blue-500"
      />
      {isLoading && (
        <div className="absolute inset-0 bg-white/50 dark:bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <Loader2 className="w-16 h-16 animate-spin text-blue-500" />
        </div>
      )}
      <div
        className={`container mx-auto px-4 sm:px-6 lg:px-24 py-12 ${isLoading ? "blur-sm" : ""}`}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto pt-12 mt-3"
        >
          <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
            <CardContent className="p-4 sm:p-8">
              <div className="text-center mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                  被相続人の手続き
                </h1>
                <p className="text-base sm:text-lg text-gray-600">
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
                  <ArrowRight className="ml-2 w-6 h-6" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>プロキシー又は新規登録の選択</DialogTitle>
            <DialogDescription>
              すでに登録があります。既存登録のプロキシーを選択するか、新規登録を行ってください。
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 space-y-2">
            {network.map((proxy, index) => (
              <Button
                key={index}
                onClick={() => handleProxySelect(proxy.proxyAddress)}
                className="w-full text-left justify-start"
                variant="outline"
              >
                {proxy.proxyAddress}
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