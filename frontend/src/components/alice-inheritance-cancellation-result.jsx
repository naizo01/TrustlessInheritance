"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Home, CheckCircle } from "lucide-react";
import { Header } from "@/components/common/variable-header";
import { useAliceState, ALICE_ACTIONS } from "@/pages/alice";

export default function InheritanceCancellationResult() {
  const { dispatch } = useAliceState();

  const handleMoveToHome = () => {
    dispatch({ type: ALICE_ACTIONS.MOVE_SPECIFIC, payload: 0 });
    dispatch({ type: ALICE_ACTIONS.RESET_STATE });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Header
        scrolled={false}
        scrollToSection={() => {}}
        appBadgeText="相続取り消し完了"
        appBadgeClassName=""
      />
      <div className="container mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="max-w-2xl mx-auto bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-xl border-0">
            <CardContent className="p-8 space-y-6">
              <div className="text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  相続の取り消しが完了しました
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                  登録された相続資産の取り消し処理が正常に完了しました。
                </p>
              </div>

              <Alert className="bg-blue-600 text-white border-0">
                <AlertDescription>
                  相続登録された全ての資産の相続が取り消されました。これにより、相続人は登録された資産を相続することができなくなります。
                </AlertDescription>
              </Alert>

              <div className="space-y-4 bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  取り消し後の状態
                </h2>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                  <li>全ての登録資産の相続が無効になりました</li>
                  <li>設定されていたロック期間は解除されました</li>
                  <li>相続人の権利が無効化されました</li>
                </ul>
              </div>

              <div className="flex flex-col gap-4">
                <Button
                  variant="default"
                  className="w-full py-6 bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={handleMoveToHome}
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
