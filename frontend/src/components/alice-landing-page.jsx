"use client";

import React, { useState, useEffect, useCallback } from "react";
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
  const [isRegistered, setIsRegistered] = useState(false);
  const [isNextEnabled, setIsNextEnabled] = useState(false);
  const [assetsInfo, setAssetsInfo] = useState({
    assets: [],
    lockPeriod: 0,
    lockEndDate: null,
  });
  const [isLoading, setIsLoading] = useState(true);
  const { positions } = usePosts();

  // ウォレット情報の取得、以降のページのTOKEN関連情報の成型
  const fetchAssetsData = useCallback(async () => {
    // context apiで、networkをsimulate
    if (positions.length > 0 && isAddress(address)) {
      const position = positions.find((pos) =>
        pos.address.toLowerCase().includes(address.toLowerCase())
      );

      if (position) {
        const data = {
          assets: [],
          lockPeriod: position.lockPeriod || 0,
          lockEndDate: position.lockEndDate || null,
        };

        Object.entries(position.tokens).forEach(([symbol, balance], index) => {
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
              balance: balance / 10 ** tokenMatched.decimals,
              value:
                (balance * tokenMatched.price) / 10 ** tokenMatched.decimals,
              selected: false,
            });
          }
        });
        // ウォレット情報の取得、以降のページのTOKEN関連情報の成型【ここまで】

        // Global State/local stateのassets情報を更新
        dispatch({ type: ALICE_ACTIONS.SET_ASSETS, payload: data });
        setAssetsInfo(data);
      }
    }
    setIsLoading(false);
  }, [address, positions, dispatch]);

  // networkの情報を取得、当該address登録の有無を確認
  useEffect(() => {
    // address登録の有無を確認
    // setIsRegistered(...)
    //
    // address登録が確認された場合、相続申請の有無を確認
    // setRegistered(...)
    //
    // address登録・相続申請情報を基に、state.statusを更新、更新によりページ変遷を管理
    //
  }, [dispatch]);

  //
  useEffect(() => {
    if (isConnected && isAddress(address)) {
      setIsNextEnabled(true);
      dispatch({ type: ALICE_ACTIONS.SET_DECEASED_ADDRESS, payload: address });
      fetchAssetsData();
    } else {
      setIsNextEnabled(false);
      setIsLoading(false);
    }
  }, [isConnected, address, dispatch, fetchAssetsData]);

  function handleNextStep() {
    dispatch({ type: ALICE_ACTIONS.SET_DECEASED_ADDRESS, payload: address });
    dispatch({ type: ALICE_ACTIONS.SET_ASSETS, payload: assetsInfo });
    dispatch({ type: ALICE_ACTIONS.MOVE_FORWARD });
  }

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
        className={`container mx-auto px-24 py-12 ${isLoading ? "blur-sm" : ""}`}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto pt-12"
        >
          <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
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
                  <ArrowRight className="ml-2 w-6 h-6" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

export default dynamic(() => Promise.resolve(SubLandingPage), {
  ssr: false,
});
