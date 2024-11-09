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
import { ArrowRight, Search, CheckCircle } from "lucide-react";
import { isAddress } from "ethers";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Header } from "@/components/common/Header";

// ダミーの検索結果
const dummySearchResults = [
  {
    id: 1,
    secret: "3時のおやつはババロア",
    address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
  },
  {
    id: 2,
    secret: "3時のおやつカンパニー",
    address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44f",
  },
  {
    id: 3,
    secret: "鈴木一郎が同級生",
    address: "0x742d35Cc6634C0532925a3b844Bc454e4438f50e",
  },
];

export default function AddressInputPage() {
  const [address, setAddress] = useState("");
  const [isValidAddress, setIsValidAddress] = useState(false);
  const [isInvalidAddress, setIsInvalidAddress] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<typeof dummySearchResults>(
    []
  );

  useEffect(() => {
    const valid = isAddress(address);
    setIsValidAddress(valid);
    setIsInvalidAddress(address !== "" && !valid);
  }, [address]);

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  const handleNextStep = () => {
    console.log("Proceeding with address:", address);
  };

  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      return;
    }
    const filteredResults = dummySearchResults.filter(
      (result) =>
        result.secret.toLowerCase().includes(searchQuery.toLowerCase()) ||
        result.address.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(filteredResults);
  };

  const handleSelectAddress = (selectedAddress: string) => {
    setAddress(selectedAddress);
    setIsSearchOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex flex-col">
      <Header scrolled={false} scrollToSection={() => {}} />
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
                value={address}
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
                    <span>アドレスを検索</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px] w-[90vw]">
                  <DialogHeader>
                    <DialogTitle>アドレス検索</DialogTitle>
                    <DialogDescription>
                      被相続人のEthereumアドレスを検索します。
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="flex items-center gap-4">
                      <Input
                        id="search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="秘密情報やアドレスの一部を入力..."
                        className="flex-grow"
                      />
                      <Button
                        onClick={handleSearch}
                        className="whitespace-nowrap"
                      >
                        検索
                      </Button>
                    </div>
                    {searchResults.length > 0 ? (
                      <ul className="space-y-2 max-h-[50vh] overflow-y-auto">
                        {searchResults.map((result) => (
                          <li
                            key={result.id}
                            className="flex justify-between items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer"
                            onDoubleClick={() =>
                              handleSelectAddress(result.address)
                            }
                          >
                            <div>
                              <div className="font-semibold">{result.name}</div>
                              <div className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                {result.address}
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
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
