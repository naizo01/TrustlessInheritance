'use client'

import { Card } from "@/components/ui/card"
import { Zap, AlertTriangle } from 'lucide-react'

const BackgroundSlide = () => (
  <div className="w-full max-w-4xl mx-auto p-3 mb-20 space-y-4 animate-fadeIn">
      <h2 className="text-3xl font-bold text-center mb-6">テーマ設定の背景</h2>

      <div className="flex space-x-6">
        <Card className="flex-1 border-none overflow-hidden bg-white p-6">
          <h3 className="text-xl font-bold mb-4">暗号資産アドレス数の急速な成長</h3>
          <img
            src="/graph.png"
            alt="暗号資産 addresses growth chart showing 220 million monthly active users"
            className="w-full max-w-md h-auto rounded-lg mb-4"  // max-w-mdを追加して画像の最大幅を制限
          />
          <p className="text-sm text-gray-600">出典：a16z 暗号資産「State of 暗号資産 Report 2024」</p>
        </Card>

        <Card className="flex-1 border-none p-6 bg-blue-50 dark:bg-blue-900/20">
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div>
                <h3 className="text-xl font-bold mb-4">規制緩和による成長加速</h3>
                <p className="text-gray-700 dark:text-gray-300 mt-3">
                  トランプ政権による規制緩和などで暗号資産への投資はこの数年でさらに加速すると考えられ、<br />相続のニーズも増加すると考えられます。
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <Card className="border-none p-6 bg-purple-50 dark:bg-purple-900/20">
        <div className="flex items-center gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-full p-3">
            <AlertTriangle className="w-8 h-8 text-purple-500" />
          </div>
          <p className="text-xl font-bold text-gray-700 dark:text-gray-200">
            株式、債券は証券会社によって相続がされますが、<br />
            暗号資産がどうやって相続されるか皆さん知っていますか？
          </p>
        </div>
      </Card>
  </div>
)

export default BackgroundSlide