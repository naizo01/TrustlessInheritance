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
import { Info, ArrowRight } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useRouter } from "next/navigation";

import { Header } from "@/components/common/Header";

export default function InheritanceAssetsUnlockedPage({ onClick }) {
  const router = useRouter();
  const deceasedAddress = "0x742...44e";
  const [assets, setAssets] = useState([
    {
      id: 1,
      name: "USDT",
      type: "トークン",
      balance: 1000,
      value: 1000,
      selected: false,
    },
    {
      id: 2,
      name: "USDC",
      type: "トークン",
      balance: 2500,
      value: 2500,
      selected: false,
    },
  ]);

  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    const newTotal = assets.reduce(
      (sum, asset) => sum + (asset.selected ? asset.value : 0),
      0
    );
    setTotalValue(newTotal);
  }, [assets]);

  const handleAssetSelection = (id, selected) => {
    setAssets(
      assets.map((asset) => (asset.id === id ? { ...asset, selected } : asset))
    );
  };

  const handleBalanceChange = (id, newBalance) => {
    setAssets(
      assets.map((asset) => {
        if (asset.id === id) {
          const updatedBalance = Math.min(
            Math.max(0, newBalance),
            asset.balance
          );
          return {
            ...asset,
            value: updatedBalance,
          };
        }
        return asset;
      })
    );
  };

  const handleNextStep = () => {
    // Navigate to the next page for confirming transfer accounts
    // router.push('/confirm-transfer-accounts')
    onClick((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex flex-col">
      <Header scrolled={false} scrollToSection={() => {}} />
      <main className="flex justify-center p-4 mt-20">
        <Card className="w-full max-w-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-xl border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-gray-900 dark:text-white">
              相続財産の確認と送金
            </CardTitle>
            <CardDescription className="text-lg text-gray-600 dark:text-gray-300">
              {deceasedAddress}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Card className="bg-blue-600 text-white">
              <CardContent className="pt-6">
                <div className="text-sm">送金可能総額</div>
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
                        <Checkbox
                          checked={asset.selected}
                          onCheckedChange={(checked) =>
                            handleAssetSelection(asset.id, checked)
                          }
                          id={`checkbox-${asset.id}`}
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        {asset.name}
                      </TableCell>
                      <TableCell>{asset.type}</TableCell>
                      <TableCell className="text-right">
                        {asset.balance.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end">
                          <Input
                            type="number"
                            value={asset.value}
                            onChange={(e) =>
                              handleBalanceChange(
                                asset.id,
                                Number(e.target.value)
                              )
                            }
                            className="w-24 text-right"
                            min="0"
                            max={asset.balance}
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
