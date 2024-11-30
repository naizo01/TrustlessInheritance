"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { X, Home, AlertTriangle } from "lucide-react";
import { Header } from "@/components/common/variable-header";
import { useAliceState, ALICE_ACTIONS } from "@/pages/alice";
import { assets as importedAssets } from "@/lib/token";

export default function InheritanceStatus() {
  const { state, dispatch } = useAliceState();
  const [assets, setAssets] = useState(state.assets.assets);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // network登録dataをassetsに入力しているため、assetsを用いる
  // network登録dataは相続対象tokenのみなので、filterは不要
  const totalValue = assets.reduce((sum, asset) => {
    const tokenInfo = importedAssets.find(
      (token) => token.symbol === asset.symbol
    );
    if (tokenInfo) {
      return sum + asset.balance * tokenInfo.price;
    }
    return sum;
  }, 0);

  // 相続申請に前倒しで承認する（i.e. 生きている）ことはないと仮定
  // 前倒し承認をMoveToHomeに変更
  const handleMoveToHome = () => {
    dispatch({ type: ALICE_ACTIONS.MOVE_SPECIFIC, payload: 0 });
    dispatch({ type: ALICE_ACTIONS.RESET_STATE });
  };

  const handleCancelConfirmation = () => {
    setIsDialogOpen(true);
  };

  // 相続取り消しは、相続申請がなくても可能
  // したがい、相続取り消しボタンは、常時表示
  const handleCancel = () => {
    // 相続取り消しのロジックをここに実装
    console.log("相続を取り消し");

    // 処理完了後
    setIsDialogOpen(false);
    dispatch({ type: ALICE_ACTIONS.MOVE_SPECIFIC, payload: 100 });
  };

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Header
        scrolled={false}
        scrollToSection={() => {}}
        appBadgeText="相続資産の許可"
        appBadgeClassName=""
      />
      <div className="container mx-auto px-4 py-24">
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-xl border-0">
          <CardContent className="p-6 space-y-6">
            {state.status === "registered" && (
              <Alert className="bg-blue-600 text-white border-0">
                <AlertDescription>
                  下記資産が相続登録されています。相続人からの相続申請は、現時点でありません。
                </AlertDescription>
              </Alert>
            )}
            {state.status === "submitted" && (
              <Alert className="bg-purple-600 text-white border-0">
                <AlertDescription>
                  相続人から相続申請がなされました。
                  <br />
                  下記資産が相続可能な状態です。ロック期間は、
                  <span className="font-bold text-lg text-yellow-200 dark:text-blue-400 underline ">
                    {formatDate(state.assets.lockEndDate)}（同日を含まず。）
                  </span>
                  に満了となります。
                </AlertDescription>
              </Alert>
            )}
            <motion.div
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              className="bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 p-6 rounded-lg"
            >
              <h3 className="text-lg font-medium text-white mb-2">
                相続可能総額
              </h3>
              <p className="text-3xl font-bold text-white">
                ${totalValue.toLocaleString()}
              </p>
            </motion.div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-inner">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]"></TableHead>
                    <TableHead>資産</TableHead>
                    <TableHead className="text-center">種別</TableHead>
                    <TableHead className="text-center">付与数量</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {state.assets.assets.map((asset) => (
                    <TableRow key={asset.id}>
                      <TableCell>
                        <Checkbox
                          checked={true}
                          disabled
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
                      <TableCell className="text-center">
                        {asset.type}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatNumber(asset.balance, 3)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="flex flex-col gap-4">
              <Button
                variant="destructive"
                className="w-full"
                onClick={handleCancelConfirmation}
              >
                <X className="mr-2 h-5 w-5" />
                相続取り消し
              </Button>
              <Button
                variant="outline"
                className="w-full py-4 text-gray-700 dark:text-gray-200"
                onClick={handleMoveToHome}
              >
                <Home className="mr-2 h-6 w-6" />
                メインに戻る
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              相続取り消しの確認
            </DialogTitle>
            <DialogDescription>
              相続を取り消すと、登録された資産の相続が無効になります。この操作は取り消せません。本当に相続を取り消しますか？
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <Button type="button" variant="destructive" onClick={handleCancel}>
              はい、取り消します
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsDialogOpen(false)}
            >
              いいえ、取り消しをキャンセルします
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
