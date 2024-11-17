"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { isAddress } from "ethers";
import { useAccount } from "wagmi";
import { Header } from "@/components/common/variable-header";
import dynamic from "next/dynamic";
import { useBobState, BOB_ACTIONS } from "@/pages/bob";

const ConfirmAddressesPage = () => {
  const { state, dispatch } = useBobState();

  const { address, isConnected } = useAccount();
  const [isNextEnabled, setIsNextEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsNextEnabled(isAddress(state.deceasedAddress) && isAddress(address));
    dispatch({ type: BOB_ACTIONS.SET_INHERITOR_ADDRESS, payload: address });
    setIsLoading(false);
  }, [state.deceasedAddress, address, isConnected]);

  const handleNextStep = () => {
    dispatch({ type: BOB_ACTIONS.SET_INHERITOR_ADDRESS, payload: address });
    dispatch({ type: BOB_ACTIONS.MOVE_FORWARD });
    console.log(`Proceeding to next step with inheritor address: ${address}`);
  };

  if (isLoading) {
    return (
      <>
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
          <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
            Loading...
          </p>
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex flex-col">
      <Header
        scrolled={false}
        scrollToSection={() => {}}
        showLandingPageButtons={true}
        appBadgeText="本人確認"
        appBadgeClassName="border-green-500 text-green-500"
      />
      <main className="flex justify-center p-4 mt-20">
        <Card className="w-full max-w-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-xl border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-gray-900 dark:text-white">
              アドレス確認
            </CardTitle>
            <CardDescription className="text-lg text-gray-600 dark:text-gray-300">
              被相続人と相続人のアドレスを確認してください
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                  被相続人のアドレス
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 break-all">
                  {state.deceasedAddress}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                  相続人のアドレス
                </h3>
                {isConnected ? (
                  <p className="text-sm text-gray-600 dark:text-gray-400 break-all">
                    {address}
                  </p>
                ) : (
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      ウォレットが接続されていません
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      画面上部の「Connect
                      Wallet」ボタンをクリックしてウォレットを接続してください。
                    </p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center pt-6">
            <Button
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full text-lg transition-all duration-200 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleNextStep}
              disabled={!isNextEnabled}
            >
              次へ進む
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
};

export default dynamic(() => Promise.resolve(ConfirmAddressesPage), {
  ssr: false,
});
