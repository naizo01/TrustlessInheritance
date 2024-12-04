'use client'

import { Card } from "@/components/ui/card"
import { Zap, AlertTriangle } from 'lucide-react'

const BackgroundSlide = () => (
  <div className="w-full max-w-4xl mx-auto p-6 mb-20 space-y-8 animate-fadeIn">
      <h2 className="text-3xl font-bold text-center mb-8">テーマ設定の背景</h2>

    <div className="space-y-6">
      <Card className="border-none overflow-hidden bg-white p-6">
        <h3 className="text-xl font-bold mb-4">暗号資産アドレス数の急速な成長</h3>
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/State-of-Crypto-2024-MASTER-1-1536x864.jpg-W8CNd8zwGY5ZQ1U093ggSYgD2Lll2E.jpeg"
          alt="Crypto addresses growth chart showing 220 million monthly active users"
          className="w-full max-w-xl h-auto rounded-lg mb-4"  // max-w-mdを追加して画像の最大幅を制限
        />
        <p className="text-sm text-gray-600">出典：a16z crypto「State of Crypto Report 2024」</p>
      </Card>

      <Card className="border-none p-6 bg-blue-50 dark:bg-blue-900/20">
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-full p-2">
              <Zap className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <h4 className="font-semibold">規制緩和による成長加速</h4>
              <p className="text-gray-700 dark:text-gray-300">
                トランプ政権による規制緩和などでcryptoへの投資はこの数年でさらに加速すると考えられ、<br />相続のニーズも増加すると考えられます。
              </p>
            </div>
          </div>
        </div>
      </Card>

      <Card className="border-none p-6 bg-purple-50 dark:bg-purple-900/20">
        <div className="flex items-center gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-full p-3">
            <AlertTriangle className="w-8 h-8 text-purple-500" />
          </div>
          <p className="text-xl font-bold text-gray-700 dark:text-gray-200">
            株式、債券は証券会社によって相続がされますが、<br />
            Cryptoがどうやって相続されるか皆さん知っていますか？
          </p>
        </div>
      </Card>
    </div>
  </div>
)

export default BackgroundSlide