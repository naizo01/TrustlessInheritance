"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowRight, Search, AlertCircle } from 'lucide-react'
import { isAddress } from "ethers"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Header } from "@/components/common/variable-header"

const availableAddresses = [
  "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
  "0xB8A1726abC8b984c60DD400370AA846705175c4D",
  "0x1e290652CaeDF92cf430DCa1c5B6faC90F4A13D9",
];

const mockData = {
  "0x742d35Cc6634C0532925a3b844Bc454e4438f44e": {
    assets: [
      { name: "ETH", balance: "2.5 ETH", value: "$5,000" },
      { name: "USDT", balance: "1500 USDT", value: "$1,500" },
    ],
    lockPeriod: 3,
    inheritors: [
      { address: "0x1234...5678", share: "60%" },
      { address: "0x8765...4321", share: "40%" },
    ],
  },
  "0xB8A1726abC8b984c60DD400370AA846705175c4D": {
    assets: [
      { name: "ETH", balance: "1.0 ETH", value: "$2,000" },
      { name: "USDC", balance: "3000 USDC", value: "$3,000" },
    ],
    lockPeriod: 6,
    inheritors: [
      { address: "0xABCD...EFGH", share: "50%" },
      { address: "0xIJKL...MNOP", share: "50%" },
    ],
  },
  "0x1e290652CaeDF92cf430DCa1c5B6faC90F4A13D9": {
    assets: [
      { name: "ETH", balance: "0.5 ETH", value: "$1,000" },
      { name: "DAI", balance: "2000 DAI", value: "$2,000" },
    ],
    lockPeriod: 4,
    inheritors: [
      { address: "0xQRST...UVWX", share: "70%" },
      { address: "0xYZAB...CDEF", share: "30%" },
    ],
  },
};

const fetchInheritanceData = async (address: string) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  if (address in mockData) {
    return mockData[address as keyof typeof mockData];
  }
  throw new Error("指定されたアドレスの相続データが見つかりません。");
};

export default function InheritanceDataCheck() {
  const [address, setAddress] = useState("")
  const [isValidAddress, setIsValidAddress] = useState(false)
  const [inheritanceData, setInheritanceData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputAddress = e.target.value
    setAddress(inputAddress)
    setIsValidAddress(isAddress(inputAddress))
    
    // アドレスの自動補完
    const matchedAddresses = availableAddresses.filter(addr => 
      addr.toLowerCase().startsWith(inputAddress.toLowerCase())
    );
    setSuggestions(matchedAddresses);
  }

  const handleSearch = async () => {
    if (!isValidAddress) return

    setIsLoading(true)
    setError("")
    try {
      const data = await fetchInheritanceData(address)
      setInheritanceData(data)
    } catch (err) {
      setError("データの取得に失敗しました。もう一度お試しください。")
      setInheritanceData(null)
    }
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex flex-col">
      <Header
        scrolled={false}
        scrollToSection={() => {}}
        showLandingPageButtons={true}
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
                    <CardTitle>相続可能資産</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>資産</TableHead>
                          <TableHead>残高</TableHead>
                          <TableHead>価値</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {inheritanceData.assets.map((asset: any, index: number) => (
                          <TableRow key={index}>
                            <TableCell>{asset.name}</TableCell>
                            <TableCell>{asset.balance}</TableCell>
                            <TableCell>{asset.value}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>相続人情報</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>アドレス</TableHead>
                          <TableHead>相続割合</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {inheritanceData.inheritors.map((inheritor: any, index: number) => (
                          <TableRow key={index}>
                            <TableCell>{inheritor.address}</TableCell>
                            <TableCell>{inheritor.share}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    ロック期間: {inheritanceData.lockPeriod}ヶ月
                  </AlertDescription>
                </Alert>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

