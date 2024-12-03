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
import { Input } from "@/components/ui/input";
import { Search, AlertCircle, Lock, Unlock, Clock, CheckCircle, Calendar, XCircle } from 'lucide-react';
import { isAddress } from "ethers";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Header } from "@/components/common/variable-header";
import { formatDurationFromUnixTime } from "@/lib/formatDuration";
import { usePosts } from "../app/postContext";
import { assets } from "../lib/token";
import Image from "next/image";

export default function InheritanceDataCheck() {
  const [address, setAddress] = useState("");
  const [isValidAddress, setIsValidAddress] = useState(false);
  const [inheritanceData, setInheritanceData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const { transactions } = usePosts();

  const handleAddressChange = (e) => {
    const inputAddress = e.target.value;
    setAddress(inputAddress);
    setIsValidAddress(isAddress(inputAddress));

    const matchedAddresses = transactions
      .map((t) => t.ownerAddress)
      .filter((addr) => addr.toLowerCase().startsWith(inputAddress.toLowerCase()));
    setSuggestions(matchedAddresses);
  };

  const handleSearch = async () => {
    if (!isValidAddress) return;

    setIsLoading(true);
    setError("");
    try {
      const data = transactions.find((t) => t.ownerAddress.toLowerCase() === address.toLowerCase());
      if (data) {
        setInheritanceData(data);
      } else {
        throw new Error("指定されたアドレスの相続データが見つかりません。");
      }
    } catch (err) {
      setError("データの取得に失敗しました。もう一度お試しください。");
      setInheritanceData(null);
    }
    setIsLoading(false);
  };

  const calculateTokenValue = (symbol, amount) => {
    const token = assets.find((a) => a.symbol === symbol);
    if (!token) return "0.00";
    const value = (Number(amount) / Math.pow(10, token.decimals)) * token.price;
    return value.toFixed(2);
  };

  const formatTokenAmount = (symbol, amount) => {
    const token = assets.find((a) => a.symbol === symbol);
    if (!token) return "0.00";
    return (Number(amount) / Math.pow(10, token.decimals)).toFixed(2);
  };

  const getInheritanceStatus = (data) => {
    if (!data.lockEndDate) {
      return { status: "未承認", icon: Clock, color: "text-gray-500" };
    } else if (new Date() > new Date(data.lockEndDate)) {
      return { status: "ロック期間満了", icon: Unlock, color: "text-green-500" };
    } else {
      return { status: "ロック期間中", icon: Lock, color: "text-yellow-500" };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex flex-col">
      <Header
        scrolled={false}
        scrollToSection={() => {}}
        showLandingPageButtons={false}
        appBadgeText="相続データ確認"
        appBadgeClassName=""
      />
      <main className="flex justify-center p-4 mt-20">
        <Card className="w-full max-w-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-xl border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-gray-900 dark:text-white">
              相続データ確認
            </CardTitle>
            <CardDescription className="text-lg text-gray-600 dark:text-gray-300">
              アドレスを入力して相続情報を確認
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex space-x-2 relative">
              <Input
                type="text"
                placeholder="0x..."
                value={address}
                onChange={handleAddressChange}
                className="flex-grow"
              />
              <Button
                onClick={handleSearch}
                disabled={!isValidAddress || isLoading}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isLoading ? (
                  "読み込み中..."
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" /> 検索
                  </>
                )}
              </Button>
            </div>

            {suggestions.length > 0 && (
              <div className="absolute z-10 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg mt-1">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                    onClick={() => {
                      setAddress(suggestion);
                      setIsValidAddress(true);
                      setSuggestions([]);
                    }}
                  >
                    {suggestion}
                  </div>
                ))}
              </div>
            )}

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {inheritanceData && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                      相続資産
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[50px]"></TableHead>
                          <TableHead>資産</TableHead>
                          <TableHead>残高</TableHead>
                          <TableHead className="text-right">価値 (USD)</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {Object.entries(inheritanceData.tokens).map(([symbol, amount]) => {
                          const token = assets.find((a) => a.symbol === symbol);
                          if (!token) return null;
                          return (
                            <TableRow key={symbol}>
                              <TableCell>
                                <Image
                                  src={token.logoURL.startsWith('/') ? token.logoURL : `/${token.logoURL}`}
                                  alt={`${symbol} logo`}
                                  width={24}
                                  height={24}
                                />
                              </TableCell>
                              <TableCell>{symbol}</TableCell>
                              <TableCell>{formatTokenAmount(symbol, amount)}</TableCell>
                              <TableCell className="text-right">
                                ${calculateTokenValue(symbol, amount)}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </CardContent>
                  <CardFooter className="flex flex-col items-start space-y-2">
                    <div className="flex items-center space-x-2">
                      {inheritanceData.lockEndDate ? (
                        <CheckCircle className="h-5 w-5 text-blue-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500" />
                      )}
                      <span className="text-gray-700 dark:text-gray-300">
                        承認状況: {inheritanceData.lockEndDate ? "承認済み" : "未承認"}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {(() => {
                        const { status, icon: StatusIcon, color } = getInheritanceStatus(inheritanceData);
                        return (
                          <>
                            <StatusIcon className={`h-5 w-5 ${color}`} />
                            <span className="text-gray-700 dark:text-gray-300">
                              ロック状況: {status}
                            </span>
                          </>
                        );
                      })()}
                    </div>
                    {inheritanceData.lockPeriod && (
                      <div className="flex items-center space-x-2">
                        {inheritanceData.lockEndDate ? (
                          new Date() > new Date(inheritanceData.lockEndDate) ? (
                            <Unlock className="h-5 w-5 text-green-500" />
                          ) : (
                            <Clock className="h-5 w-5 text-gray-500" />
                          )
                        ) : (
                          <Clock className="h-5 w-5 text-gray-500" />
                        )}
                        <span className="text-gray-700 dark:text-gray-300">
                          ロック期間: {formatDurationFromUnixTime(inheritanceData.lockPeriod)}
                        </span>
                      </div>
                    )}
                    {inheritanceData.lockEndDate && (
                      <div className="flex items-center space-x-2">
                        {new Date() > new Date(inheritanceData.lockEndDate) ? (
                          <Unlock className="h-5 w-5 text-green-500" />
                        ) : (
                          <Calendar className="h-5 w-5 text-gray-500" />
                        )}
                        <span className="text-gray-700 dark:text-gray-300">
                          ロック終了日: {new Date(inheritanceData.lockEndDate).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </CardFooter>
                </Card>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
