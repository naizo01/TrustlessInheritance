"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { ArrowRight, CheckCircle } from "lucide-react";
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
import { Header } from "@/components/common/variable-header";
import { useBobState, BOB_ACTIONS } from "@/pages/bob";
import useInitiateInheritance from "@/hooks/useInitiateInheritance";

export default function Component() {
  const { state, dispatch } = useBobState();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const {writeContract, waitFn} = useInitiateInheritance(state.deceasedAddress, state.proof)

  const handleNext = () => {
    dispatch({ type: BOB_ACTIONS.MOVE_FORWARD });
  };

  const handleConfirmApplication = async () => {
    try {
      writeContract();
      if (waitFn.isSuccess) {
        handleNext();
      } else if (waitFn.isError) {
        console.error('Transaction failed');
      }
    } catch (error) {
      console.error('Operation failed:', error);
    }
   };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex flex-col">
      <Header
        scrolled={false}
        scrollToSection={() => {}}
        appBadgeText="ZKプルーフの生成・認証"
        appBadgeClassName="border-pink-500 text-pink-500"
      />
      <main className="flex justify-center p-4 mt-20">
        <Card className="w-full max-w-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-xl border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-gray-900 dark:text-white">
              ZKプルーフ生成完了
            </CardTitle>
            <CardDescription className="text-lg text-gray-600 dark:text-gray-300">
              ZKプルーフの生成が完了しました。相続申請を行ってください。
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-center text-green-500 dark:text-green-400">
              <CheckCircle className="w-16 h-16" />
            </div>
            <p className="text-center text-gray-700 dark:text-gray-300">
              ZKプルーフの生成が正常に完了しました。このプルーフを使用して相続申請を行うことができます。
            </p>
          </CardContent>
          <CardFooter className="flex justify-center pt-6">
            <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <AlertDialogTrigger asChild>
                <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full text-lg transition-all duration-200 ease-in-out transform hover:scale-105">
                  このプルーフを使用して申請をする
                  <ArrowRight className="ml-2 h-5 w-5" />
                  {waitFn.isLoading && (
                    <div className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                      処理中...
                    </div>
                  )}
                
                  {waitFn.isSuccess && (
                    <Button 
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={handleNext}
                    >
                      次へ
                    </Button>
                  )}
                  
                  {waitFn.isError && (
                    <div className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                      エラー
                    </div>
                  )}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>申請の確認</AlertDialogTitle>
                  <AlertDialogDescription>
                    申請を行います。よろしいですか？
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>キャンセル</AlertDialogCancel>
                  <AlertDialogAction onClick={handleConfirmApplication}>
                    申請する
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
