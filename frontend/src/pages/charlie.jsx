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
import { AlertCircle, Lock, Unlock, Clock, CheckCircle, Calendar, XCircle } from 'lucide-react';
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
import { useAccount } from "wagmi";
import useOwnerToProxy from "@/hooks/useOwnerToProxy";
import { getProxyInfo, convertToDummyTransaction } from "@/hooks/getProxyInfo";

export default function InheritanceDataCheck() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { transactions, setTransactions } = usePosts();

  const { address: userAddress } = useAccount();
  const { data: proxyAddresses } = useOwnerToProxy(userAddress);

  useEffect(() => {
    const fetchProxyInfos = async () => {
      if (proxyAddresses && proxyAddresses.length > 0) {
        const infos = [];
        await Promise.all(
          proxyAddresses.map(async (address, index) => {
            const info = await getProxyInfo(address);
            const convetInfo = convertToDummyTransaction(info, index + 1);
            infos.push(convetInfo);
          })
        );
        setTransactions(infos);
      }
    };
    fetchProxyInfos();
  }, [proxyAddresses]);

  useEffect(() => {
    if (userAddress && transactions.length > 0) {
      const userTransactions = transactions.filter((t) => t.ownerAddress.toLowerCase() === userAddress.toLowerCase());
      if (userTransactions.length > 0) {
        setError("");
      } else {
        setError("あなたのアドレスに関連する相続データが見つかりません。");
      }
    }
  }, [userAddress, transactions]);

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
      return { status: null };
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
              あなたの相続データ
            </CardTitle>
            <CardDescription className="text-lg text-gray-600 dark:text-gray-300">
              あなたの相続情報を確認
            </CardDescription>
          </CardHeader>
          <CardContent className="">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {transactions.filter((t) => t.ownerAddress.toLowerCase() === userAddress.toLowerCase()).map((inheritanceData, index) => (
              <div key={index} className="space-y-6 mt-5">
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
                        相続申請状況: {inheritanceData.lockEndDate ? "申請済み" : "未申請"}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {(() => {
                        const { status, icon: StatusIcon, color } = getInheritanceStatus(inheritanceData);
                        if(!status) return ;
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
            ))}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}