"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { AlertCircle } from "lucide-react"
import { motion } from "framer-motion"
import { Header } from "@/components/common/Header"

interface Asset {
  id: string
  name: string
  type: string
  balance: number
  value: number
  selected: boolean
}

export function InheritanceUi() {
  const [address] = useState("0x126···xyz")
  const [assets, setAssets] = useState<Asset[]>([
    { id: "1", name: "USDT", type: "トークン", balance: 1000, value: 1000, selected: true },
    { id: "2", name: "USDC", type: "トークン", balance: 2500, value: 2500, selected: true },
  ])

  const totalValue = assets
    .filter(asset => asset.selected)
    .reduce((sum, asset) => sum + asset.value, 0)

  const handleAssetToggle = (assetId: string) => {
    setAssets(assets.map(asset =>
      asset.id === assetId
        ? { ...asset, selected: !asset.selected }
        : asset
    ))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Header scrolled={false} scrollToSection={() => {}} /> {/* ヘッダーを追加 */}
      <main className="pt-16">

      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="max-w-2xl mx-auto bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-xl border-0">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center text-gray-900 dark:text-white">
                相続人UI（被相続人選択後）
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                className="bg-blue-600 text-white p-4 rounded-lg text-center font-medium"
              >
                {address}
              </motion.div>

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
                          <Checkbox
                            checked={asset.selected}
                            onCheckedChange={() => handleAssetToggle(asset.id)}
                            className="border-2"
                          />
                        </TableCell>
                        <TableCell className="font-medium">{asset.name}</TableCell>
                        <TableCell>{asset.type}</TableCell>
                        <TableCell className="text-right">{asset.balance.toLocaleString()}</TableCell>
                        <TableCell className="text-right">${asset.value.toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="bg-blue-50 dark:bg-blue-900/50 rounded-lg p-4 flex items-start space-x-3"
              >
                <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-blue-600 dark:text-blue-400">
                  選択した資産は相続プロセス開始後、3ヶ月間ロックされます。
                  この期間中、被相続人は相続をキャンセルすることができます。
                </p>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </main>
    </div>
  )
}