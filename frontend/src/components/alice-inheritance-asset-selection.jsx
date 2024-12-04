"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/common/variable-header";
import { useAliceState, ALICE_ACTIONS } from "@/pages/alice";
import { assets as importedAssets } from "@/lib/token";

export default function InheritanceAssetSelection() {
  const { state, dispatch } = useAliceState();
  const [assets, setAssets] = useState(state.assets.assets);

  const totalValue = assets
    .filter((asset) => asset.selected)
    .reduce((sum, asset) => {
      const tokenInfo = importedAssets.find(
        (token) => token.symbol === asset.symbol
      );
      if (tokenInfo) {
        return sum + asset.granted * tokenInfo.price;
      }
    }, 0);

  const handleGrantedChange = (id, newGranted) => {
    setAssets((prevAssets) =>
      prevAssets.map((asset) => {
        if (asset.id === id) {
          const updatedGranted = Math.min(
            Math.max(0, newGranted),
            asset.balance
          );
          return {
            ...asset,
            granted: updatedGranted,
          };
        }
        return asset;
      })
    );
  };

  const handleAssetSelection = (id, selected) => {
    setAssets((prevAssets) =>
      prevAssets.map((asset) =>
        asset.id === id
          ? { ...asset, selected, granted: selected ? asset.balance : 0 }
          : asset
      )
    );
  };

  const handleNext = () => {
    const selectedAssets = assets.filter((asset) => asset.selected);
    dispatch({ type: ALICE_ACTIONS.SET_GRANTED, payload: selectedAssets });
    dispatch({ type: ALICE_ACTIONS.MOVE_FORWARD });
  };

  const handleMoveBackword = () => {
    dispatch({ type: ALICE_ACTIONS.MOVE_BACKWARD });
  };

  const formatNumber = (num, decimal = 2) => {
    return num.toLocaleString(undefined, {
      minimumFractionDigits: decimal,
      maximumFractionDigits: decimal,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Header
        scrolled={false}
        scrollToSection={() => {}}
        appBadgeText="選択された資産"
        appBadgeClassName=""
      />
      <div className="container mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="max-w-4xl mx-auto bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-xl border-0">
            <CardContent className="p-8 space-y-8">
              <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
                相続を許可する資産を選択してください。
              </h1>

              <motion.div
                initial={{ x: -20 }}
                animate={{ x: 0 }}
                className="bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 p-6 rounded-lg"
              >
                <h3 className="text-lg font-medium text-white mb-2">
                  相続可能総額
                </h3>
                <p className="text-3xl font-bold text-white">
                  ${formatNumber(totalValue)}
                </p>
              </motion.div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-inner overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]"></TableHead>
                      <TableHead>資産</TableHead>
                      <TableHead className="text-center">種別</TableHead>
                      <TableHead className="text-right">残高</TableHead>
                      <TableHead className="text-center">数量</TableHead>
                      {/* <TableHead className="text-right">価値</TableHead> */}
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
                              value={asset.granted}
                              onChange={(e) =>
                                handleGrantedChange(
                                  asset.id,
                                  Number(e.target.value)
                                )
                              }
                              className="w-24 text-right"
                              min="0"
                              max={asset.balance}
                              step="0.01"
                              disabled={!asset.selected}
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="flex flex-col gap-4">
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg font-semibold"
                  onClick={handleNext}
                  disabled={!assets.some((asset) => asset.selected)}
                >
                  登録内容の確認
                </Button>
                <Button
                  variant="outline"
                  className="w-full py-4 text-gray-700 dark:text-gray-200"
                  onClick={handleMoveBackword}
                >
                  <ArrowLeft className="mr-2 h-5 w-5" />
                  前画面へ戻る
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
