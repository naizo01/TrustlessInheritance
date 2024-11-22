"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ArrowLeft } from "lucide-react"
import { useRouter } from 'next/navigation'
import { Header } from "@/components/common/variable-header";
import { useAliceState, ALICE_ACTIONS } from "@/pages/alice";

interface Asset {
  id: string
  name: string
  type: string
  balance: number
  quantity: string
  value: number
  selected: boolean
  highlighted?: boolean
}
  export default function InheritanceAssetSelection({ onClick }: { onClick: (num: number) => void }) {
    const { state, dispatch } = useAliceState(); // オブジェクトのプロパティを直接使用
    const handleNext = () => {
      dispatch({ type: ALICE_ACTIONS.MOVE_FORWARD });
    };
  const router = useRouter()
  const [assets, setAssets] = useState<Asset[]>([
    { id: "1", name: "USDT", type: "トークン", balance: 1000, quantity: "", value: 1000, selected: false },
    { id: "2", name: "USDC", type: "トークン", balance: 2500, quantity: "", value: 2500, selected: false },
    { id: "3", name: "stETH", type: "トークン", balance: 2, quantity: "", value: 5000, selected: false, highlighted: true },
    { id: "4", name: "wETH", type: "トークン", balance: 1, quantity: "", value: 2500, selected: false, highlighted: true },
    { id: "5", name: "BAYC", type: "NFT", balance: 1, quantity: "", value: 0, selected: false },
    { id: "6", name: "MAYC", type: "NFT", balance: 1, quantity: "", value: 0, selected: false },
  ])

  const totalValue = assets
    .filter(asset => asset.selected)
    .reduce((sum, asset) => {
      const quantity = parseFloat(asset.quantity) || 0
      return sum + (asset.value * quantity)
    }, 0)

  const handleAssetToggle = (assetId: string) => {
    setAssets(assets.map(asset =>
      asset.id === assetId
        ? { ...asset, selected: !asset.selected }
        : asset
    ))
  }

  const handleQuantityChange = (assetId: string, value: string) => {
    setAssets(assets.map(asset =>
      asset.id === assetId
        ? { ...asset, quantity: value }
        : asset
    ))
  }

  const handleApprove = () => {
    const selectedAssets = assets.filter(asset => asset.selected)
    console.log("選択された資産:", selectedAssets)
    router.push('/lock-period')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Header
        scrolled={false}
        scrollToSection={() => {}}
        appBadgeText="選択された資産"
        appBadgeClassName=""
      />
      <div className="container mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="max-w-2xl mx-auto bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-xl border-0">
            <CardContent className="p-6 space-y-6">
              <h1 className="text-xl font-bold text-center">
                相続を許可する資産を選択してください。
              </h1>

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
                      <TableHead>数量</TableHead>
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
                          />
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
                        <TableCell>
                          <Input
                            type="number"
                            placeholder="数量を入力"
                            value={asset.quantity}
                            onChange={(e) => handleQuantityChange(asset.id, e.target.value)}
                            className="w-32"
                            min="0"
                            step="1"
                          />
                        </TableCell>
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
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6"
                  onClick={handleNext}
                  disabled={!assets.some(asset => asset.selected)}
                >
                  選択した資産の相続を許可
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => window.history.back()}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  前画面へ戻る
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}