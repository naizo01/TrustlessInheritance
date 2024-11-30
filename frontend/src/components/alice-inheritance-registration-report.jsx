"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Home, CheckCircle } from "lucide-react";
import { Header } from "@/components/common/variable-header";
import { useAliceState, ALICE_ACTIONS } from "@/pages/alice";
import { assets as importedAssets } from "@/lib/token";

export default function InheritanceRegistrationReport() {
  const { state, dispatch } = useAliceState();

  const totalValue = state.granted.reduce((sum, asset) => {
    const tokenInfo = importedAssets.find(
      (token) => token.symbol === asset.symbol
    );
    if (tokenInfo) {
      return sum + asset.granted * tokenInfo.price;
    }
    return sum;
  }, 0);

  const formatNumber = (num, decimal = 2) => {
    return num.toLocaleString(undefined, {
      minimumFractionDigits: decimal,
      maximumFractionDigits: decimal,
    });
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleReturnToMain = () => {
    dispatch({ type: ALICE_ACTIONS.MOVE_SPECIFIC, payload: 0 });
    dispatch({ type: ALICE_ACTIONS.RESET_STATE });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Header
        scrolled={false}
        scrollToSection={() => {}}
        appBadgeText="登録完了"
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
              <div className="text-center space-y-4">
                <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  登録が完了しました
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                  以下の内容で相続資産の登録が完了しました。
                </p>
              </div>

              <motion.div
                initial={{ x: -20 }}
                animate={{ x: 0 }}
                className="bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 p-6 rounded-lg"
              >
                <h3 className="text-lg font-medium text-white mb-2">
                  登録された相続可能総額
                </h3>
                <p className="text-3xl font-bold text-white">
                  ${formatNumber(totalValue)}
                </p>
              </motion.div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-inner overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>資産</TableHead>
                      <TableHead className="text-center">種別</TableHead>
                      <TableHead className="text-right">残高</TableHead>
                      <TableHead className="text-center">付与数量</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {state.granted.map((asset) => (
                      <TableRow key={asset.id}>
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
                              <span className="font-medium text-gray-900 dark:text-white">
                                {asset.name}
                              </span>
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                {asset.symbol}
                              </span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          {asset.type}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatNumber(asset.balance, 3)}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatNumber(asset.granted, 3)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="space-y-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6">
                <div className="flex items-center">
                  <span className="text-gray-600 dark:text-gray-400">
                    ロック期間:
                  </span>
                  <span className="font-medium mx-2">
                    {state.lockPeriod} ヶ月
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <Button
                  variant="outline"
                  className="w-full py-4 text-gray-700 dark:text-gray-200"
                  onClick={handleReturnToMain}
                >
                  <Home className="mr-2 h-5 w-5" />
                  メインページに戻る
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
