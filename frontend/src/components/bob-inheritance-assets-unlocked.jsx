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
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Info, ArrowRight, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Header } from "@/components/common/variable-header";
import { useBobState, BOB_ACTIONS } from "@/pages/bob";
import { usePosts } from "@/app/postContext";
import { assets as importedAssets } from "@/lib/token";

export default function InheritanceAssetsUnlockedPage() {
  const { state, dispatch } = useBobState();
  const [totalValue, setTotalValue] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [assets, setAssets] = useState([]);

  // Fetch and initialize assets
  useEffect(() => {
    // we don't need simulating ABI call here //
    // data fetch is done in bob-inheritance-asset.jsx //
    setIsLoading(false);
    setAssets(state.assets);
  }, [, state.assets]);

  // Update total value when assets change
  useEffect(() => {
    const newTotal = assets.reduce((acc, asset) => {
      if (asset.selected && asset.transfer > 0) {
        const tokenInfo = importedAssets.find(
          (token) => token.symbol === asset.symbol
        );
        if (tokenInfo) {
          return acc + asset.transfer * tokenInfo.price;
        }
      }
      return acc;
    }, 0);
    setTotalValue(newTotal);
  }, [assets]);

  const formatNumber = (num, decimal = 2) => {
    return num.toLocaleString(undefined, {
      minimumFractionDigits: decimal,
      maximumFractionDigits: decimal,
    });
  };

  const handleAssetSelection = (id, selected) => {
    setAssets((prevAssets) =>
      prevAssets.map((asset) =>
        asset.id === id
          ? { ...asset, selected, transfer: selected ? asset.balance : 0 }
          : asset
      )
    );
  };

  const handleTransferChange = (id, newTransfer) => {
    setAssets((prevAssets) =>
      prevAssets.map((asset) => {
        if (asset.id === id) {
          const updatedTransfer = Math.min(
            Math.max(0, newTransfer),
            asset.balance
          );
          return {
            ...asset,
            transfer: updatedTransfer,
          };
        }
        return asset;
      })
    );
  };

  const handleNextStep = () => {
    const selectedAssets = assets.filter((asset) => asset.selected);
    dispatch({ type: BOB_ACTIONS.SET_WITHDRAWAL, payload: selectedAssets });
    dispatch({ type: BOB_ACTIONS.MOVE_FORWARD });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex flex-col">
      <Header
        scrolled={false}
        scrollToSection={() => {}}
        appBadgeText="相続資産の受け取り"
        appBadgeClassName="border-yellow-500 text-yellow-500"
      />
      {isLoading && (
        <div className="flex flex-col items-center justify-center min-h-screen fixed inset-0 bg-white bg-opacity-75 z-50">
          <Loader2 className="w-16 h-16 animate-spin text-blue-500" />
        </div>
      )}
      <main className="flex justify-center p-4 mt-20">
        <Card className="w-full max-w-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-xl border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-gray-900 dark:text-white">
              相続財産の確認と送金
            </CardTitle>
            <CardDescription className="text-lg text-gray-600 dark:text-gray-300">
              {state.deceasedAddress &&
                state.deceasedAddress.replace(
                  state.deceasedAddress.slice(6, -4),
                  "...."
                )}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Card className="bg-blue-600 text-white">
              <CardContent className="pt-6">
                <div className="text-sm">送金可能総額</div>
                <div className="text-4xl font-bold">
                  ${formatNumber(totalValue)}
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
                    <TableHead className="text-right">転送量</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assets.map((asset) => (
                    <TableRow key={asset.id}>
                      <TableCell>
                        <Checkbox
                          checked={asset.selected}
                          onCheckedChange={(checked) =>
                            handleAssetSelection(asset.id, checked)
                          }
                          id={`checkbox-${asset.id}`}
                        />
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
                        <div className="flex justify-end">
                          <Input
                            type="number"
                            value={asset.transfer}
                            onChange={(e) =>
                              handleTransferChange(
                                asset.id,
                                Number(e.target.value)
                              )
                            }
                            className="w-24 text-right"
                            min="0"
                            max={asset.balance}
                            step="0.001"
                            disabled={!asset.selected}
                          />
                        </div>
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
                ロック期間が満了しました。選択した資産を自由に送金できます。
              </AlertDescription>
            </Alert>
            <Alert
              variant="info"
              className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800"
            >
              <Info className="h-4 w-4 text-green-600 dark:text-green-400" />
              <AlertDescription className="text-green-800 dark:text-green-200">
                次のページで、各資産の送金先アカウントを確認・変更できます。
              </AlertDescription>
            </Alert>
          </CardContent>
          <CardFooter className="flex justify-center pt-6">
            <Button
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full text-lg transition-all duration-200 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleNextStep}
              disabled={totalValue === 0}
            >
              資産・金額・送金アカウントの確認
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
