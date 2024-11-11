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
import { ArrowRight, Upload } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

import { Header } from "@/components/common/Header";

export default function ZKProofGenerationPage({ onClick }) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setFilePreview(content.slice(0, 200) + "..."); // Display first 200 characters
      };
      reader.readAsText(file);
    }
  };

  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleGenerateZKProof = () => {
    console.log("Generating ZK Proof...");
    // Implement ZK Proof generation logic here
    onClick((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex flex-col">
      <Header scrolled={false} scrollToSection={() => {}} />
      <main className="flex justify-center p-4 mt-20">
        <Card className="w-full max-w-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-xl border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-gray-900 dark:text-white">
              ZKプルーフの生成
            </CardTitle>
            <CardDescription className="text-lg text-gray-600 dark:text-gray-300">
              秘密情報ファイルを選択し、ZKプルーフを生成します
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert
              variant="info"
              className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800"
            >
              <AlertDescription className="text-blue-800 dark:text-blue-200">
                これから、ZKプルーフの生成と認証を行います。秘密情報が書かれたファイルを選択してください。
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
              <Button
                onClick={handleFileButtonClick}
                variant="outline"
                className="w-full flex items-center justify-center space-x-2 py-3"
              >
                <Upload className="w-5 h-5" />
                <span>秘密情報ファイルを選択</span>
              </Button>

              {filePreview && (
                <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-md">
                  <h3 className="text-lg font-semibold mb-2">
                    ファイルプレビュー:
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 break-all">
                    {filePreview}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-center pt-6">
            <Button
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full text-lg transition-all duration-200 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleGenerateZKProof}
              disabled={!selectedFile}
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
