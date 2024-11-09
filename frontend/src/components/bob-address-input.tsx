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
import { Input } from "@/components/ui/input";
import { ArrowRight, Search, CheckCircle } from "lucide-react";
import { Header } from "@/components/common/Header";
import { isAddress } from "ethers";

export default function AddressInputPage() {
  const [address, setAddress] = useState("");
  const [isValidAddress, setIsValidAddress] = useState(false);
  const [isInvalidAddress, setIsInvalidAddress] = useState(false);

  useEffect(() => {
    const valid = isAddress(address);
    setIsValidAddress(valid);
    setIsInvalidAddress(address !== "" && !valid);
  }, [address]);

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  const handleNextStep = () => {
    // Handle next step logic here
    console.log("Proceeding with address:", address);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex flex-col">
      <Header scrolled={false} scrollToSection={() => {}} />
      <main className="flex justify-center p-4 mt-20">
        <Card className="w-full max-w-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-xl border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-gray-900 dark:text-white">
              被相続人のアドレス入力
            </CardTitle>
            <CardDescription className="text-lg text-gray-600 dark:text-gray-300">
              被相続人のEthereumアドレスを入力してください
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <Input
                type="text"
                placeholder="0x..."
                value={address}
                onChange={handleAddressChange}
                className="w-full p-3 border rounded-md text-lg"
              />
              {isInvalidAddress && (
                <div className="flex items-center text-red-600 dark:text-red-400">
                  <span>無効なEthereumアドレスです</span>
                </div>
              )}
              {isValidAddress && (
                <div className="flex items-center text-green-600 dark:text-green-400">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  <span>有効なEthereumアドレスです</span>
                </div>
              )}
              <Button
                variant="outline"
                className="w-full flex items-center justify-center space-x-2 py-3"
                onClick={() => {
                  /* Handle search logic */
                }}
              >
                <Search className="w-5 h-5" />
                <span>アドレスを検索</span>
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center pt-6">
            <Button
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full text-lg transition-all duration-200 ease-in-out transform hover:scale-105"
              onClick={handleNextStep}
              disabled={!isValidAddress}
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
