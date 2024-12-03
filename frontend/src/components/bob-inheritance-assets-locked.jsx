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
import { Info, Check, Home, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useRouter } from "next/navigation";

import { Header } from "@/components/common/variable-header";
import { useBobState, BOB_ACTIONS } from "@/pages/bob";

export default function InheritanceAssetsLockedPage() {
  const { state, dispatch } = useBobState();
  const [totalValue, setTotalValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (state.assets.length > 0) {
      const sumTotalValue = state.assets.reduce(
        (acc, asset) => acc + asset.value,
        0
      );
      setTotalValue(sumTotalValue);
      setIsLoading(false);
    }
  }, [, state.assets]);

  // lockEndDate formatted in Japanese
  const lockEndDate = state.lockEndDate;
  const formattedEndDate = new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(lockEndDate);

  const handleReturnToMain = () => {
    dispatch({ type: BOB_ACTIONS.MOVE_SPECIFIC, payload: 0 });
    dispatch({ type: BOB_ACTIONS.RESET_STATE });
  };

  const formatNumber = (num) => {
    return num.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex flex-col">
      <Header
        scrolled={false}
        scrollToSection={() => {}}
        appBadgeText="ロック期間中"
        appBadgeClassName="border-pink-500 text-pink-500"
      />
      <main className="flex justify-center p-4 mt-20">
        <Card className="w-full max-w-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-xl border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-gray-900 dark:text-white">
              相続財産の確認
            </CardTitle>
            <CardDescription className="text-lg text-gray-600 dark:text-gray-300">
              {state.deceasedAddress.replace(
                state.deceasedAddress.slice(6, -4),
                "...."
              )}
            </CardDescription>
          </CardHeader>
          {isLoading && (
            <div className="flex flex-col items-center justify-center space-y-4">
              <Loader2 className="w-16 h-16 animate-spin text-blue-500" />
            </div>
          )}
          {!isLoading && (
            <CardContent className="space-y-6">
              <Card className="bg-blue-600 text-white">
                <CardContent className="pt-6">
                  <div className="text-sm">相続可能総額</div>
                  <div className="text-4xl font-bold">
                    ${formatNumber(totalValue)}
                  </div>
                </CardContent>
              </Card>

              <div className="rounded-lg border bg-card">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]"></TableHead>
                      <TableHead>資産</TableHead>
                      <TableHead>種別</TableHead>
                      <TableHead className="text-right">残高</TableHead>
                      <TableHead className="text-right">価値</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {state.assets.map((asset, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Check className="h-4 w-4 text-green-500" />
                        </TableCell>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                              <img
                                src={
                                  asset.logURL ||
                                  `/placeholder.svg?height=32&width=32`
                                }
                                alt={asset.name}
                                className="w-6 h-6"
                              />
                            </div>
                            <div className="flex flex-col">
                              <span className="font-medium text-gray-900">
                                {asset.name}
                              </span>
                              <span className="text-sm text-gray-500">
                                {asset.symbol}
                              </span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{asset.type}</TableCell>
                        <TableCell className="text-right">
                          {formatNumber(asset.balance)}
                        </TableCell>
                        <TableCell className="text-right">
                          ${formatNumber(asset.value)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="space-y-4">
                <Alert
                  variant="info"
                  className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800"
                >
                  <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <AlertDescription className="text-blue-800 dark:text-blue-200">
                    選択した資産は相続プロセス開始後、{state.lockPeriod}
                    ヶ月間ロックされます。この期間中、被相続人は相続をキャンセルすることができます。正確なロック期間の満了時期は"ロック期間満了日"をご参照ください。
                  </AlertDescription>
                </Alert>

                <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <p className="text-yellow-800 dark:text-yellow-200 font-medium">
                    ロック期間満了日: {formattedEndDate} （同日を含まず）
                  </p>
                </div>
              </div>
            </CardContent>
          )}
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
