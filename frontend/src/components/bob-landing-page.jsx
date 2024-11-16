"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, Lock, UserCheck, FileText, Wallet } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/common/variable-header";
import { useBobState, BOB_ACTIONS } from "@/pages/bob";

export default function BobLandingPage() {
  const { state, dispatch } = useBobState();

  const handleNextStep = () => {
    dispatch({ type: BOB_ACTIONS.MOVE_FORWARD });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex flex-col">
      <Header
        scrolled={false}
        scrollToSection={() => {}}
        appBadgeText="相続開始の申請"
        appBadgeClassName=""
      />
      <main className=" flex  justify-center p-4 mt-20">
        <Card className="w-full max-w-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-xl border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-gray-900 dark:text-white">
              相続人の手続き
            </CardTitle>
            <CardDescription className="text-lg text-gray-600 dark:text-gray-300">
              ZKプルーフを使用した安全な相続プロセス
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                  <Lock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    1. 相続開始の申請
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    被相続人を選択し、相続開始の申請を行います。
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full">
                  <UserCheck className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    2. 本人確認
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    相続人としての身分証明を提供し、認証を行います。
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full">
                  <FileText className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    3. ZKプルーフの生成・認証
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    必要な情報を入力し、プライバシーを保護したZKプルーフを生成・認証ます。
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-yellow-100 dark:bg-yellow-900 p-3 rounded-full">
                  <Wallet className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    4. 相続資産の受け取り
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    ZKプルーフの検証後に開始されるロック期間が終了し、指定された資産を安全に受け取ります。
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center pt-6">
            <Button
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full text-lg transition-all duration-200 ease-in-out transform hover:scale-105"
              onClick={handleNextStep}
              disabled={false}
            >
              相続開始の申請
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
