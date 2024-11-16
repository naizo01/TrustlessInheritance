'use client'

import React from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ArrowRight, Info, Check } from 'lucide-react'
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Header } from "@/components/common/Header"

export default function Component({ onClick }) {
  const deceasedAddress = "0x742...44e"
  const totalValue = 3500
  const assets = [
    {
      name: "USDT",
      type: "トークン",
      balance: 1000,
      value: 1000,
    },
    {
      name: "USDC",
      type: "トークン",
      balance: 2500,
      value: 2500,
    },
  ]

  const handleNextStep = () => {
    console.log("Next step")
    onClick((prev) => prev + 1)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex flex-col">
      <Header scrolled={false} scrollToSection={() => {}} />
      <main className="flex justify-center p-4 mt-20">
        <Card className="w-full max-w-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-xl border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-gray-900 dark:text-white">
              相続財産の確認
            </CardTitle>
            <CardDescription className="text-lg text-gray-600 dark:text-gray-300">
              {deceasedAddress}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Card className="bg-blue-600 text-white">
              <CardContent className="pt-6">
                <div className="text-sm">相続可能総額</div>
                <div className="text-4xl font-bold">
                  ${totalValue.toLocaleString()}
                </div>
              </CardContent>
            </Card>

            <div className="rounded-lg border bg-card">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]"></TableHead>
                    <TableHead>資産</TableHead>
                    <TableHead>種別</TableHead>
                    <TableHead className="text-right">残高</TableHead>
                    <TableHead className="text-right">価値</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assets.map((asset, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Check className="h-4 w-4 text-green-500" />
                      </TableCell>
                      <TableCell className="font-medium">
                        {asset.name}
                      </TableCell>
                      <TableCell>{asset.type}</TableCell>
                      <TableCell className="text-right">
                        {asset.balance.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right">
                        ${asset.value.toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <Alert
              variant="info"
              className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800"
            >
              <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <AlertDescription className="text-blue-800 dark:text-blue-200">
                選択した資産は相続プロセス開始後、3ヶ月間ロックされます。この期間中、被相続人は相続をキャンセルすることができます。
              </AlertDescription>
            </Alert>
          </CardContent>
          <CardFooter className="flex justify-center pt-6">
            <Button
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full text-lg transition-all duration-200 ease-in-out transform hover:scale-105"
              onClick={handleNextStep}
            >
              次へ進む
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}