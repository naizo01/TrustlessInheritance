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

import { Header } from "@/components/common/Header";

export default function ConfirmAddressesPage({ onClick }) {
  const [deceasedAddress, setDeceasedAddress] = useState("");
  const [inheritorAddress, setInheritorAddress] = useState("");
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [isNextEnabled, setIsNextEnabled] = useState(false);

  useEffect(() => {
    // Simulating getting the deceased address from the previous page
    setDeceasedAddress("0x742d35Cc6634C0532925a3b844Bc454e4438f44e");

    // Simulating wallet connection check
    const checkWalletConnection = async () => {
      // Replace this with actual wallet connection logic
      const connected = Math.random() < 0.5; // 50% chance of being connected for demo
      setIsWalletConnected(connected);
      if (connected) {
        setInheritorAddress("0x742d35Cc6634C0532925a3b844Bc454e4438f50e");
      }
    };

    checkWalletConnection();
  }, []);

  useEffect(() => {
    setIsNextEnabled(isAddress(deceasedAddress) && isAddress(inheritorAddress));
  }, [deceasedAddress, inheritorAddress]);

  const handleConnectWallet = async () => {
    // Replace this with actual wallet connection logic
    setIsWalletConnected(true);
    setInheritorAddress("0x1D1479C185d32EB90533a08b36B3CFa5F84A0E6B");
  };

  const handleNextStep = () => {
    console.log("Proceeding to next step");
    // Add logic for the next step here
    onClick((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex flex-col">
      <Header scrolled={false} scrollToSection={() => {}} />
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
                  {deceasedAddress}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                  相続人のアドレス
                </h3>
                {isWalletConnected ? (
                  <p className="text-sm text-gray-600 dark:text-gray-400 break-all">
                    {inheritorAddress}
                  </p>
                ) : (
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      ウォレットが接続されていません
                    </p>
                    <Button
                      onClick={handleConnectWallet}
                      variant="outline"
                      className="w-full"
                    >
                      ウォレットを接続
                    </Button>
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
}
