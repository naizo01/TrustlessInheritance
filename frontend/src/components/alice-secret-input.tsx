"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import { Hourglass } from "lucide-react";
import { Header } from "@/components/common/variable-header";
import { useAliceState, ALICE_ACTIONS } from "@/pages/alice";
import useGenerateProof, { ProofData } from "@/hooks/useGenerateProof";
import useCreateProxy from "@/hooks/useCreateProxy";

// Define the type for the dispatch function
type AliceDispatch = React.Dispatch<AliceAction>;

// Define the type for Alice actions
type AliceAction =
  | { type: typeof ALICE_ACTIONS.SET_SECRET; payload: string }
  | { type: typeof ALICE_ACTIONS.SET_PROOF; payload: ProofData | null }
  | { type: typeof ALICE_ACTIONS.MOVE_FORWARD }
  | { type: typeof ALICE_ACTIONS.MOVE_BACKWARD };

export default function LockPeriodSetting() {
  const { state, dispatch } = useAliceState() as {
    state: any;
    dispatch: AliceDispatch;
  }; // オブジェクトのプロパティを直接使用
  const [secretInfo, setSecretInfo] = useState<string>("");
  const [proofData, setProofData] = useState<ProofData | null>(null);
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleNext = (): void => {
    dispatch({ type: ALICE_ACTIONS.SET_SECRET, payload: secretInfo });
    dispatch({ type: ALICE_ACTIONS.SET_PROOF, payload: proofData });
    dispatch({ type: ALICE_ACTIONS.MOVE_FORWARD });
  };

  const handlePrevious = (): void => {
    dispatch({ type: ALICE_ACTIONS.MOVE_BACKWARD });
  };

  const handleGenerateProof = async () => {
    const proof = await generateProof(Number(secretInfo));
    setProofData(proof);
  };

  const handleNextWithProof = async (): Promise<void> => {
    try {
      if (isLoading) return;
      setIsLoading(true);
      setErrorMessage("");
      await handleGenerateProof();
      writeContract();

    } catch (error) {
      console.error("Operation failed:", error);
    }
  };
  const handleError = (error: any) => {
    console.error("Error occurred:", error);
    setErrorMessage(error.message || "不明なエラーが発生しました");
    setIsLoading(false);
  };
  const handleZKError = (error: any) => {
    console.error("Error occurred:", error);
    setErrorMessage("この秘密情報は利用できません。");
    setIsLoading(false);
  };

  const handleSuccess = (data: any) => {
    console.log("Transaction successful:", data);
    console.log("proxy", data.logs[0].address);
    dispatch({
      type: ALICE_ACTIONS.SET_PROXY_ADDRESS,
      payload: data.logs[0].address,
    });
    setIsLoading(false);
    handleNext();
  };

  const { generateProof } = useGenerateProof("alice",handleZKError);

  const { writeContract, waitFn } = useCreateProxy(
    state.lockPeriod,
    proofData,
    handleError,
    handleSuccess
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Header
        scrolled={false}
        scrollToSection={() => {}}
        appBadgeText="秘密情報の登録"
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
              <h1 className="text-xl font-bold text-center">
                秘密情報を入力して秘密情報の登録ボタンを押してください。
              </h1>

              <div className="bg-gray-100 dark:bg-gray-900 p-6 rounded-lg">
                <Input
                  type="password"
                  placeholder="秘密情報を入力"
                  value={secretInfo}
                  onChange={(e) => setSecretInfo(e.target.value)}
                  className="text-center"
                />
              </div>

              <div className="flex gap-4">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={handlePrevious}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  前画面へ戻る
                </Button>
                <Button
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={handleNextWithProof}
                  // disabled={!secretInfo || isLoading}
                >
                  {isLoading ? (
                    <Hourglass className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    "秘密情報の登録"
                  )}
                </Button>
              </div>

              {errorMessage && (
                <div className="mt-4 p-2 bg-red-100 text-red-700 rounded max-w-full break-words">
                  {errorMessage}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
