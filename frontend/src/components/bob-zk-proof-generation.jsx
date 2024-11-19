"use client";

import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { ArrowRight, Upload, Edit, X } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Header } from "@/components/common/variable-header";
import { useBobState, BOB_ACTIONS } from "@/pages/bob";

export default function Component() {
  const { state, dispatch } = useBobState();

  const [selectedFile, setSelectedFile] = useState(null);
  const [showDirectInput, setShowDirectInput] = useState(false);
  const [directInput, setDirectInput] = useState("");
  const [secretInfo, setSecretInfo] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result;
        setSecretInfo(content);
      };
      reader.readAsText(file);
    }
    // Reset the file input value to allow re-selection of the same file
    event.target.value = "";
  };

  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleClearFile = () => {
    setSelectedFile(null);
    setSecretInfo(null);
  };

  const handleDirectInputButtonClick = () => {
    setShowDirectInput(true);
  };

  const handleDirectInputChange = (event) => {
    setDirectInput(event.target.value);
  };

  const handleConfirmDirectInput = () => {
    setSecretInfo(directInput);
    setShowDirectInput(false);
    setDirectInput("");
    setSelectedFile(null);
  };

  const handleGenerateZKProof = () => {
    console.log("Generating ZK Proof...");
    // Implement ZK Proof generation logic here

    dispatch({ type: BOB_ACTIONS.SET_PROOF, payload: "generated zk proof" });
    dispatch({ type: BOB_ACTIONS.MOVE_FORWARD });
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
              ZKプルーフの生成
            </CardTitle>
            <CardDescription className="text-lg text-gray-600 dark:text-gray-300">
              秘密情報ファイルを選択するか、直接入力してZKプルーフを生成します
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert
              variant="info"
              className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800"
            >
              <AlertDescription className="text-blue-800 dark:text-blue-200">
                これから、ZKプルーフの生成と認証を行います。秘密情報が書かれたファイルを選択するか、直接入力してください。
              </AlertDescription>
            </Alert>

            <div className="space-y-4">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                className="hidden"
                accept="*.*"
              />
              <div className="flex items-center space-x-2">
                <Button
                  onClick={handleFileButtonClick}
                  variant="outline"
                  className="flex-grow flex items-center justify-center space-x-2 py-3"
                >
                  <Upload className="w-5 h-5" />
                  <span>秘密情報ファイルを選択</span>
                </Button>
                {selectedFile && (
                  <Button
                    onClick={handleClearFile}
                    variant="outline"
                    size="icon"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
              {selectedFile && (
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  選択されたファイル: {selectedFile.name}
                </p>
              )}

              <Button
                onClick={handleDirectInputButtonClick}
                variant="outline"
                className="w-full flex items-center justify-center space-x-2 py-3"
              >
                <Edit className="w-5 h-5" />
                <span>秘密情報を直接入力</span>
              </Button>

              {showDirectInput && (
                <div className="mt-4 flex space-x-2">
                  <Input
                    type="text"
                    placeholder="秘密情報を入力"
                    value={directInput}
                    onChange={handleDirectInputChange}
                    className="flex-grow"
                  />
                  <Button onClick={handleConfirmDirectInput}>確定</Button>
                </div>
              )}

              {secretInfo && (
                <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-md">
                  <h3 className="text-lg font-semibold mb-2">
                    入力された秘密情報:
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 break-all">
                    {secretInfo.slice(0, 200) +
                      (secretInfo.length > 200 ? "..." : "")}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-center pt-6">
            <Button
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full text-lg transition-all duration-200 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleGenerateZKProof}
              disabled={!secretInfo}
            >
              ZKプルーフを作成する
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
