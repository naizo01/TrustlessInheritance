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
import { Info, ArrowRight, CheckCircle, XCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import { isAddress } from "ethers";

import { Header } from "@/components/common/variable-header";
import { useBobState, BOB_ACTIONS } from "@/pages/bob";
import { assets as importedAssets } from "@/lib/token";
import useWithdrawTokens from "@/hooks/useWithdrawTokens";

export default function TransferConfirmationPage() {
  const { state, dispatch } = useBobState();
  const [assets, setAssets] = useState(state.withdrawals);
  const [totalValue, setTotalValue] = useState(0);
  const [destinationAccount, setDestinationAccount] = useState(
    state.inheritorAddress
  );
  const [isEditingAccount, setIsEditingAccount] = useState(false);
  const [isValidAccount, setIsValidAccount] = useState(true);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const selectedTokens = state.withdrawals.map(selectedToken => selectedToken.contractAddress);
  // value を整数に変換してから BigInt に変換
  const amounts = state.withdrawals.map(selectedToken => BigInt(Math.floor(selectedToken.transfer * (10 ** 18))));

  const {writeContract, waitFn} = useWithdrawTokens(
    state.proxyAddress,
    selectedTokens,
    amounts,
    state.proof
  );
  console.log("proxyAddress",state.proxyAddress);
  console.log("withdrawals",state.withdrawals);
  console.log("proof",state.proof);
  useEffect(() => {
    const calculateTotal = () => {
      const newTotal = assets.reduce((sum, asset) => {
        if (asset.selected && asset.transfer > 0) {
          const tokenInfo = importedAssets.find(
            (token) => token.symbol === asset.symbol
          );
          if (tokenInfo) {
            return sum + asset.transfer * tokenInfo.price;
          }
        }
        return sum;
      }, 0);
      setTotalValue(newTotal);
    };

    calculateTotal();
    setIsLoading(false);
  }, [assets]);

  useEffect(() => {
    setIsValidAccount(isAddress(destinationAccount));
  }, [destinationAccount]);

  const handleEditAccount = () => {
    setIsEditingAccount(true);
  };

  const handleAccountChange = (e) => {
    setDestinationAccount(e.target.value);
  };

  const handleTransfer = () => {
    setIsConfirmDialogOpen(true);
  };

  const handleNext = () => {
    dispatch({ type: BOB_ACTIONS.MOVE_FORWARD });
  };

  const executeTransfer = () => {
    // Implement transfer logic here
    try {
      writeContract();
      if (waitFn.isSuccess) {
        dispatch({ type: BOB_ACTIONS.MOVE_FORWARD });
        dispatch({
          type: BOB_ACTIONS.SET_RECIPIENT_ADDRESS,
          payload: destinationAccount,
        });
        console.log("Transfer executed");
      } else if (waitFn.isError) {
        console.error('Transaction failed');
      }
    } catch (error) {
      console.error('Operation failed:', error);
    }
  };

  const stopTransaction = () => {
    // Implement logic to stop the transaction
    console.log("Transaction stopped");
    dispatch({ type: BOB_ACTIONS.MOVE_SPECIFIC, payload: 3 });
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
        appBadgeText="相続資産の受け取り"
        appBadgeClassName="border-yellow-500 text-yellow-500"
      />
      <main className="flex justify-center p-4 mt-20">
        <Card className="w-full max-w-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-xl border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-gray-900 dark:text-white">
              送金内容の確認
            </CardTitle>
            <CardDescription className="text-lg text-gray-600 dark:text-gray-300">
              {state.deceasedAddress &&
                state.deceasedAddress.replace(
                  state.deceasedAddress.slice(6, -4),
                  "...."
                )}
            </CardDescription>
            <CardDescription className="text-lg text-gray-600 dark:text-gray-300">
              送金内容と送金先アカウントを確認してください
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Card className="bg-blue-600 text-white">
              <CardContent className="pt-6">
                <div className="text-sm">送金総額</div>
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
                  {state.withdrawals.map((asset) => (
                    <TableRow key={asset.id}>
                      <TableCell>
                        <Checkbox checked={asset.selected} disabled />
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
                        {formatNumber(asset.transfer, 3)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="font-semibold">送金先アカウント:</div>
                {!isEditingAccount && (
                  <Button variant="outline" onClick={handleEditAccount}>
                    送金先アカウントの変更
                  </Button>
                )}
              </div>
              {isEditingAccount ? (
                <div className="space-y-2">
                  <Input
                    value={destinationAccount}
                    onChange={handleAccountChange}
                    placeholder="0x..."
                  />
                  {isValidAccount ? (
                    <div className="flex items-center text-green-600 dark:text-green-400">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      <span>有効なEthereumアカウントです</span>
                    </div>
                  ) : (
                    <div className="flex items-center text-red-600 dark:text-red-400">
                      <XCircle className="w-4 h-4 mr-2" />
                      <span>無効なEthereumアカウントです</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded">
                  {destinationAccount}
                </div>
              )}
            </div>

            <Alert
              variant="info"
              className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800"
            >
              <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <AlertDescription className="text-blue-800 dark:text-blue-200">
                送金内容をご確認のうえ、送金を実行してください。
              </AlertDescription>
            </Alert>
          </CardContent>
          <CardFooter className="flex justify-center pt-6 space-x-4">
            <Button
              className="w-full sm:w-auto bg-white hover:bg-gray-100 text-red-600 font-bold py-3 px-6 rounded-full text-lg transition-all duration-200 ease-in-out transform hover:scale-105 border-2 border-red-600"
              onClick={stopTransaction}
            >
              取引を中止する
            </Button>
            
            {!waitFn.isLoading && !waitFn.isSuccess && !waitFn.isError ? (
              <AlertDialog
                open={isConfirmDialogOpen}
                onOpenChange={setIsConfirmDialogOpen}
              >
                <AlertDialogTrigger asChild>
                  <Button
                    className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full text-lg transition-all duration-200 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleTransfer}
                    disabled={!isValidAccount || totalValue === 0}
                  >
                    送金を実行する
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>送金の確認</AlertDialogTitle>
                    <AlertDialogDescription>
                      送金を実行します。よろしいですか？
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>キャンセル</AlertDialogCancel>
                    <AlertDialogAction onClick={executeTransfer}>
                      実行
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            ) : waitFn.isLoading ? (
              <Button
                className="w-full sm:w-auto bg-gray-400 text-white font-bold py-3 px-6 rounded-full text-lg"
                disabled
              >
                処理中...
              </Button>
            ) : waitFn.isSuccess ? (
              <Button
                className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full text-lg"
                onClick={handleNext}
              >
                次へ進む
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            ) : waitFn.isError ? (
              <Button
                className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full text-lg"
                onClick={handleTransfer}
              >
                再試行する
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            ) : null}
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
