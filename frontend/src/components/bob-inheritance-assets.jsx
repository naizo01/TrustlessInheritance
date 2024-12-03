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
import { ArrowRight, Info, Check, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Header } from "@/components/common/variable-header";
import { useBobState, BOB_ACTIONS } from "@/pages/bob";
import { usePosts } from "@/app/postContext";
import { assets as importedAssets } from "@/lib/token";
import { Noto_Sans_Wancho } from "next/font/google";

export default function Component() {
  const { state, dispatch } = useBobState();
  const [assetsInfo, setAssetsInfo] = useState({
    assets: [],
    lockPeriod: 0,
    lockEndDate: null,
  });
  const [totalValue, setTotalValue] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { transactions } = usePosts(); // import dummy data via usePosts

  useEffect(() => {
    //////////////////////////////////////////////////
    /// networkから指定されたaddressの相続財産を取得 ///
    //////////////////////////////////////////////////

    // fetch transactions and create assets data
    if (transactions.length > 0) {
      const transaction = transactions.find((tx) =>
        tx.address.toLowerCase().includes(state.deceasedAddress.toLowerCase())
      );
      const data = {
        assets: [],
        lockEndDate: transaction.lockEndDate,
        lockPeriod: transaction.lockPeriod,
      };
      dispatch({
        type: BOB_ACTIONS.SET_LOCK_END_DATE,
        payload: transaction.lockEndDate,
      });
      dispatch({
        type: BOB_ACTIONS.SET_LOCK_PERIOD,
        payload: transaction.lockPeriod,
      });

      // update assets array
      Object.entries(transaction.tokens).forEach(([symbol, balance], index) => {
        const tokenMatched = importedAssets.find(
          (token) => token.symbol === symbol
        );
        if (tokenMatched) {
          data.assets.push({
            id: index + 1,
            logURL: tokenMatched.logoURL,
            name: tokenMatched.name,
            symbol: symbol,
            type: `${tokenMatched.type} ﾄｰｸﾝ`,
            balance: balance / 10 ** tokenMatched.decimals,
            value: (balance * tokenMatched.price) / 10 ** tokenMatched.decimals,
            selected: false,
          });
        }
      });

      // wait for 3 secnods
      const fetchAssetsData = async () => {
        await new Promise((res) => setTimeout(res, 3000));
        setAssetsInfo(data);
      };

      fetchAssetsData();
    } else {
      console.log("No matching transaction found");
    }
  }, [transactions, state.deceasedAddress]);

  useEffect(() => {
    if (assetsInfo.assets.length > 0) {
      const sumTotalValue = assetsInfo.assets.reduce(
        (acc, asset) => acc + asset.value,
        0
      );
      setTotalValue(sumTotalValue);
      setIsLoading(false);
      dispatch({ type: BOB_ACTIONS.SET_ASSETS, payload: assetsInfo.assets });

      ///// switch among waiting, approved, and matured /////
      if (assetsInfo.lockEndDate) {
        const currentDate = new Date();
        const lockEndDate = new Date(assetsInfo.lockEndDate);
        console.log(currentDate, lockEndDate);

        if (lockEndDate > currentDate) {
          // if approved but not matured
          dispatch({ type: BOB_ACTIONS.SET_APPROVAL });
        } else if (lockEndDate <= currentDate) {
          // if matured
          dispatch({ type: BOB_ACTIONS.SET_MATURED });
        }
      }
    }
  }, [assetsInfo]);

  const handleNextStep = () => {
    console.log("Next step");
    dispatch({ type: BOB_ACTIONS.SET_ASSETS, payload: assetsInfo.assets });
    dispatch({
      type: BOB_ACTIONS.SET_LOCK_PERIOD,
      payload: assetsInfo.lockPeriod,
    });
    dispatch({ type: BOB_ACTIONS.MOVE_FORWARD });
  };

  const formatNumber = (num, decimal = 2) => {
    return num.toLocaleString(undefined, {
      minimumFractionDigits: decimal,
      maximumFractionDigits: decimal,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex flex-col">
      <Header
        scrolled={false}
        scrollToSection={() => {}}
        appBadgeText="本人確認"
        appBadgeClassName="border-green-500 text-green-500"
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
                    {assetsInfo.assets.map((asset, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Check className="h-4 w-4 text-green-500" />
                        </TableCell>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                              <img
                                src={asset.logURL}
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
                          {formatNumber(asset.balance, 3)}
                        </TableCell>
                        <TableCell className="text-right">
                          ${formatNumber(asset.value)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <Alert
                variant="info"
                className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800"
              >
                <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <AlertDescription className="text-blue-800 dark:text-blue-200">
                  選択した資産は相続プロセス開始後、{assetsInfo.lockPeriod}
                  ヶ月間ロックされます。この期間中、被相続人は相続をキャンセルすることができます。
                </AlertDescription>
              </Alert>
            </CardContent>
          )}
          <CardFooter className="flex justify-center pt-6">
            <Button
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full text-lg transition-all duration-200 ease-in-out transform hover:scale-105"
              onClick={handleNextStep}
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
