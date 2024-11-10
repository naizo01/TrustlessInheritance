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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Info, Home, CheckCircle, XCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useRouter } from "next/navigation";

import { Header } from "@/components/common/Header";

export default function TransferResultPage({ onClick }) {
  const router = useRouter();
  const [transferStatus, setTransferStatus] = useState("pending"); // 'pending', 'success', or 'failure'
  const [assets, setAssets] = useState([
    {
      id: 1,
      name: "USDT",
      type: "トークン",
      balance: 1000,
      value: 1000,
      selected: true,
    },
    {
      id: 2,
      name: "USDC",
      type: "トークン",
      balance: 2500,
      value: 2500,
      selected: true,
    },
  ]);

  useEffect(() => {
    // Simulate transfer process
    const timer = setTimeout(() => {
      setTransferStatus(Math.random() > 0.4 ? "success" : "failure");
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const totalValue = assets.reduce(
    (sum, asset) => sum + (asset.selected ? asset.value : 0),
    0
  );

  const handleReturnToMain = () => {
    // router.push("/"); // Adjust this route as needed
    transferStatus === "success" && onClick((prev) => 0);
    transferStatus === "failure" && onClick((prev) => 3);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex flex-col">
      <Header scrolled={false} scrollToSection={() => {}} />
      <main className="flex justify-center p-4 mt-20">
        <Card className="w-full max-w-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-xl border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-gray-900 dark:text-white">
              送金結果
            </CardTitle>
            <CardDescription className="text-lg text-gray-600 dark:text-gray-300">
              送金処理の状況と結果を確認してください
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Card className="bg-blue-600 text-white">
              <CardContent className="pt-6">
                <div className="text-sm">送金総額</div>
                <div className="text-4xl font-bold">
                  ${totalValue.toLocaleString()}
                </div>
              </CardContent>
            </Card>

            <div className="rounded-lg border bg-card">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">選択</TableHead>
                    <TableHead>資産</TableHead>
                    <TableHead>種別</TableHead>
                    <TableHead className="text-right">残高</TableHead>
                    <TableHead className="text-right">送金額</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assets.map((asset) => (
                    <TableRow key={asset.id}>
                      <TableCell>
                        <Checkbox checked={asset.selected} disabled />
                      </TableCell>
                      <TableCell className="font-medium">
                        {asset.name}
                      </TableCell>
                      <TableCell>{asset.type}</TableCell>
                      <TableCell className="text-right">
                        {asset.balance.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right">
                        {asset.value.toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {transferStatus === "pending" && (
              <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
                <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                  送金処理中...
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  送金完了まで時間がかかる場合があります。
                </p>
              </div>
            )}

            {transferStatus === "success" && (
              <Alert
                variant="default"
                className="bg-green-50 dark:bg-green-900 border-green-200 dark:border-green-800"
              >
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                <AlertDescription className="text-green-800 dark:text-green-200">
                  送金が完了しました。
                </AlertDescription>
              </Alert>
            )}

            {transferStatus === "failure" && (
              <Alert variant="destructive">
                <XCircle className="h-5 w-5" />
                <AlertDescription>
                  送金に失敗しました。もう一度お試しください。
                </AlertDescription>
              </Alert>
            )}

            <Alert
              variant="warning"
              className="bg-yellow-50 dark:bg-yellow-900 border-yellow-200 dark:border-yellow-800"
            >
              <Info className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
              <AlertDescription className="text-yellow-800 dark:text-yellow-200">
                送金が成功した場合でも、ブロックチェーンに書き込まれただけの状態です。まれに取引が覆される可能性があります。
              </AlertDescription>
            </Alert>
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
