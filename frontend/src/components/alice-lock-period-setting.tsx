"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";

import { useState } from "react";
import { Header } from "@/components/common/variable-header";
import { useAliceState, ALICE_ACTIONS } from "@/pages/alice";

// Define types for the state and actions
type AliceState = {
  // Add other state properties as needed
  lockPeriod: string;
};

type AliceAction =
  | { type: typeof ALICE_ACTIONS.SET_LOCK_PERIOD; payload: string }
  | { type: typeof ALICE_ACTIONS.MOVE_FORWARD };

type AliceDispatch = React.Dispatch<AliceAction>;

export default function LockPeriodSetting() {
  const { state, dispatch } = useAliceState() as {
    state: AliceState;
    dispatch: AliceDispatch;
  }; // オブジェクトのプロパティを直接使用
  const [period, setPeriod] = useState<string>("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const handleQuickSelect = (months: number) => {
    setPeriod(months.toString());
  };
  const handleConfirm = (): void => {
    dispatch({ type: ALICE_ACTIONS.SET_LOCK_PERIOD, payload: Number(period) });
    dispatch({ type: ALICE_ACTIONS.MOVE_FORWARD });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Header
        scrolled={false}
        scrollToSection={() => {}}
        appBadgeText="相続開始の申請"
        appBadgeClassName=""
      />
      <div className="container mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="max-w-md mx-auto bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-xl border-0">
            <CardContent className="p-6 space-y-6">
              <div className="space-y-4">
                <h1 className="text-xl font-bold text-center whitespace-nowrap overflow-hidden text-ellipsis">
                  最初にロック期間を設定してください。
                </h1>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>
                    ・相続開始後、一定期間は資産を引き出すことができます。
                  </li>
                  <li>
                    ・ロック期間中は、万が一不正な申請が行われた場合でも資産を取り戻すことができます。
                  </li>
                </ul>
              </div>

              <div className="bg-gray-100 dark:bg-gray-900 p-6 rounded-lg space-y-4">
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    value={period}
                    onChange={(e) => setPeriod(e.target.value)}
                    placeholder="数値を入力"
                    className="text-center"
                    min="1"
                  />
                  <span className="text-gray-600 dark:text-gray-400">ヶ月</span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <Button
                    variant="outline"
                    onClick={() => handleQuickSelect(1)}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    1ヶ月
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleQuickSelect(3)}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    3ヶ月
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleQuickSelect(6)}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    6ヶ月
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleQuickSelect(12)}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    1年
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleQuickSelect(24)}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    2年
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleQuickSelect(36)}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    3年
                  </Button>
                </div>
              </div>

              <Button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6"
                onClick={() => setShowConfirmation(true)}
                disabled={!period}
              >
                決定
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
          <DialogContent className="bg-gray-100 dark:bg-gray-900 p-6 rounded-lg">
            <div className="text-center space-y-4">
              <p>ロック期間は</p>
              <p className="text-blue-600 dark:text-blue-400 text-lg font-bold">
                {period} ヶ月
              </p>
              <p>です。よろしいですか？</p>
            </div>
            <DialogFooter className="flex gap-4 mt-6">
              <Button variant="outline" className="flex-1">
                戻る
              </Button>
              <Button
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                onClick={handleConfirm}
              >
                OK
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
