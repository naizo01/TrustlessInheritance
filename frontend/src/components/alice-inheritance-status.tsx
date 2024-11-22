"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Check } from 'lucide-react'
import { Header } from "@/components/common/variable-header";

interface Asset {
  id: string
  name: string
  type: string
  balance: number
  value: number
  selected: boolean
  highlighted?: boolean
}

export default function InheritanceStatus({ onClick }: { onClick: (prev: number) => number }) {
  const handleNext = () => {
    //onClick(3); // 次のページに遷移するために num を 3 に設定
  };
  const [assets] = useState<Asset[]>([
    { id: "1", name: "USDT", type: "トークン", balance: 1000, value: 1000, selected: false },
    { id: "2", name: "USDC", type: "トークン", balance: 2500, value: 2500, selected: true },
    { id: "3", name: "stETH", type: "トークン", balance: 2, value: 5000, selected: true, highlighted: true },
    { id: "4", name: "wETH", type: "トークン", balance: 1, value: 2500, selected: true, highlighted: true },
    { id: "5", name: "BAYC", type: "NFT", balance: 1, value: 0, selected: true },
    { id: "6", name: "MAYC", type: "NFT", balance: 1, value: 0, selected: true },
  ])

  const totalValue = assets
    .filter(asset => asset.selected)
    .reduce((sum, asset) => sum + asset.value, 0)

  const handleApprove = () => {
    // 相続許可のロジックをここに実装
    console.log("相続を許可")
    if (typeof onClick === 'function') {
    }
  }

  const handleCancel = () => {
    // 相続取り消しのロジックをここに実装
    console.log("相続を取り消し")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Header
        scrolled={false}
        scrollToSection={() => {}}
        appBadgeText="相続資産の許可"
        appBadgeClassName=""
      />
      <div className="container mx-auto px-4 py-24">
      <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-xl border-0">
        <CardContent className="p-6 space-y-6">
          <Alert className="bg-purple-600 text-white border-0">
            <AlertDescription>
              下記資産が相続可能な状態です
            </AlertDescription>
          </Alert>

          <motion.div
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            className="bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 p-6 rounded-lg"
          >
            <h3 className="text-lg font-medium text-white mb-2">相続可能総額</h3>
            <p className="text-3xl font-bold text-white">
              ${totalValue.toLocaleString()}
            </p>
          </motion.div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-inner">
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
                {assets.map((asset) => (
                  <TableRow key={asset.id}>
                    <TableCell>
                      {asset.selected ? (
                        <div className="h-4 w-4 rounded-sm bg-green-500 flex items-center justify-center">
                          <Check className="h-3 w-3 text-white" />
                        </div>
                      ) : (
                        <div className="h-4 w-4 rounded-sm border border-gray-300" />
                      )}
                    </TableCell>
                    <TableCell>
                      <span className={asset.highlighted ? "relative" : ""}>
                        {asset.name}
                        {asset.highlighted && (
                          <span className="absolute bottom-0 left-0 w-full border-b-2 border-red-500" />
                        )}
                      </span>
                    </TableCell>
                    <TableCell>{asset.type}</TableCell>
                    <TableCell className="text-right">{asset.balance.toLocaleString()}</TableCell>
                    <TableCell className="text-right">
                      ${asset.value.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex flex-col gap-4">
            <Button
              className="w-full py-6 bg-gray-500 hover:bg-gray-600 text-white"
              onClick={handleApprove}
            >
              選択した資産の相続を許可
            </Button>
            <Button
              variant="destructive"
              className="w-full"
              onClick={handleCancel}
            >
              相続取り消し
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
    </div>  
  )
}