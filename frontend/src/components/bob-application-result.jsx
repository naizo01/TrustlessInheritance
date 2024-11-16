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
import { Home, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { Header } from "@/components/common/Header";

export default function Component({ onClick }) {
  const [status, setStatus] = useState("processing");

  useEffect(() => {
    // Simulating ABI call
    const fetchResult = async () => {
      await new Promise((resolve) => setTimeout(resolve, 3000)); // 3 second delay
      setStatus(Math.random() > 0.4 ? "approved" : "rejected");
    };

    fetchResult();
  }, []);

  const handleReturnToMain = () => {
    if (status === "approved") {
      onClick((prev) => 0);
    } else if (status === "rejected") {
      onClick((prev) => 4);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex flex-col">
      <Header scrolled={false} scrollToSection={() => {}} />
      <main className="flex justify-center p-4 mt-20">
        <Card className="w-full max-w-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-xl border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-gray-900 dark:text-white">
              申請結果
            </CardTitle>
            <CardDescription className="text-lg text-gray-600 dark:text-gray-300">
              相続申請の処理状況と結果
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {status === "processing" && (
              <div className="flex flex-col items-center justify-center space-y-4">
                <Loader2 className="w-16 h-16 animate-spin text-blue-500" />
                <p className="text-center text-gray-700 dark:text-gray-300">
                  申請を処理中です。しばらくお待ちください...
                </p>
              </div>
            )}
            {status === "approved" && (
              <div className="flex flex-col items-center justify-center space-y-4">
                <CheckCircle className="w-16 h-16 text-green-500" />
                <p className="text-center text-gray-700 dark:text-gray-300">
                  申請が承認されました。相続プロセスが開始されます。
                </p>
              </div>
            )}
            {status === "rejected" && (
              <div className="flex flex-col items-center justify-center space-y-4">
                <XCircle className="w-16 h-16 text-red-500" />
                <p className="text-center text-gray-700 dark:text-gray-300">
                  申し訳ありませんが、申請が却下されました。詳細については管理者にお問い合わせください。
                </p>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-center pt-6">
            <Button
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full text-lg transition-all duration-200 ease-in-out transform hover:scale-105"
              onClick={handleReturnToMain}
            >
              メインに戻る
              <Home className="ml-2 h-5 w-5" />
            </Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
