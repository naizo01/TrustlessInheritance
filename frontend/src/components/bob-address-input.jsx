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
import { Input } from "@/components/ui/input";
import { ArrowRight, Search, CheckCircle, Info } from "lucide-react";
import { isAddress } from "ethers";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Header } from "@/components/common/variable-header";
import { useBobState, BOB_ACTIONS } from "@/pages/bob";

import { usePosts } from "@/app/postContext";
import { getProxyInfo, convertToDummyTransaction } from "@/hooks/getProxyInfo";
import { getProxyInfoByHash } from "@/hooks/getProxyInfoByHash";
import { poseidonHash } from "@/lib/hash";

export default function AddressInputPage() {
  const { state, dispatch } = useBobState();
  const { setTransactions } = usePosts();

  const [isValidAddress, setIsValidAddress] = useState(false);
  const [isInvalidAddress, setIsInvalidAddress] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [hashValue, setHashValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const { transactions: dummySearchResults } = usePosts();

  useEffect(() => {
    const valid = isAddress(state.deceasedAddress);
    setIsValidAddress(valid);
    setIsInvalidAddress(state.deceasedAddress !== "" && !valid);
  }, [state.deceasedAddress]);

  useEffect(() => {
    const handler = setTimeout(async () => {
      if (searchQuery.trim() !== "") {
        try {
          const hash = await poseidonHash(searchQuery);
          setHashValue(hash);
        } catch (error) {
          console.error("Failed to calculate hash:", error);
        }
      } else {
        setHashValue("");
      }
    }, 1000); // 1秒の遅延

    return () => {
      clearTimeout(handler); // クリーンアップ
    };
  }, [searchQuery]);

  const handleAddressChange = (e) => {
    dispatch({
      type: BOB_ACTIONS.SET_DECEASED_ADDRESS,
      payload: e.target.value,
    });
  };

  const handleNextStep = () => {
    console.log("Proceeding with address:", state.deceasedAddress);
    dispatch({ type: BOB_ACTIONS.MOVE_FORWARD });
  };

  const handleSearch = async () => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      return;
    }
    try {
      const hash = await poseidonHash(searchQuery);
      const info = await getProxyInfoByHash(hash);
      const convertData = convertToDummyTransaction(info);
      setSearchResults([convertData]);
      setTransactions([convertData]);
    } catch (error) {
      console.error("Failed to fetch proxy info:", error);
      alert("プロキシ情報の取得に失敗しました。");
    }
  };

  const handleSelectAddress = (selectedAddress) => {
    dispatch({
      type: BOB_ACTIONS.SET_DECEASED_ADDRESS,
      payload: selectedAddress,
    });
    setIsSearchOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex flex-col">
      <Header
        scrolled={false}
        scrollToSection={() => {}}
        showLandingPageButtons={true}
        appBadgeText="相続開始の申請"
        appBadgeClassName=""
      />
      <main className="flex justify-center p-4 mt-20">
        <Card className="w-full max-w-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-xl border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-gray-900 dark:text-white">
              被相続人のアドレス入力
            </CardTitle>
            <CardDescription className="text-lg text-gray-600 dark:text-gray-300">
              被相続人のEthereumアドレスを入力してください
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <Input
                type="text"
                placeholder="0x..."
                value={state.deceasedAddress}
                onChange={handleAddressChange}
                className="w-full p-3 border rounded-md text-lg"
              />
              {isValidAddress && (
                <div className="flex items-center text-green-600 dark:text-green-400">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  <span>有効なEthereumアドレスです</span>
                </div>
              )}
              {isInvalidAddress && (
                <div className="flex items-center text-red-600 dark:text-red-400">
                  <span>無効なEthereumアドレスです</span>
                </div>
              )}
              <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full flex items-center justify-center space-x-2 py-3"
                  >
                    <Search className="w-5 h-5" />
                    <span>秘密情報で検索</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px] w-[90vw]">
                  <DialogHeader>
                    <DialogTitle>検索</DialogTitle>
                    <DialogDescription>
                      被相続人のEthereumアドレスを秘密情報のハッシュ値で検索します。
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="secret" className="text-sm font-medium text-gray-700">
                        秘密情報
                      </label>
                      <Input
                        type="password"
                        id="secret"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="秘密情報を入力..."
                        className="w-2/4"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="hash" className="text-sm font-medium text-gray-700">
                        ハッシュ値
                      </label>
                      <div className="flex items-center gap-4">
                        <Input
                          id="hash"
                          value={hashValue} // リアルタイムで計算されたハッシュ値を表示
                          readOnly
                          placeholder="ハッシュ値"
                          className="flex-grow"
                        />
                        <Button
                          onClick={handleSearch}
                          className="whitespace-nowrap"
                        >
                          検索
                        </Button>
                      </div>
                    </div>
                    {searchResults.length > 0 ? (
                      <div className="mt-4">
                        <p>検索結果</p>
                        <ul className="space-y-2 max-h-[50vh] overflow-y-auto">
                          {searchResults.map((result) => (
                            <li
                              key={result.id}
                              className="flex justify-between items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer"
                              onDoubleClick={() =>
                                handleSelectAddress(result.ownerAddress)
                              }
                            >
                              <div>
                                <div className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                  {result.ownerAddress}
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                        <div>
                          <Alert
                            variant="info"
                            className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800 mt-4"
                          >
                            <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                            <AlertDescription className="text-blue-800 dark:text-blue-200">
                              検索結果のアドレスを使用する場合は、該当アドレスをダブルクリックしてください。
                            </AlertDescription>
                          </Alert>
                        </div>
                      </div>
                    ) : (
                      searchQuery.trim() !== "" && <p>結果が見つかりません。</p>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center pt-6">
            <Button
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full text-lg transition-all duration-200 ease-in-out transform hover:scale-105"
              onClick={handleNextStep}
              disabled={!isValidAddress}
            >
              次へ進む
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}