'use client'

import { Card } from "@/components/ui/card"
import { Calendar, User } from 'lucide-react'

const TitleSlide = () => (
  <div className="w-full max-w-2xl mx-auto p-6 mt-12 mb-10 space-y-8">
    <div className="text-center mb-12">
      <div className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl p-8 shadow-lg">
        <h1 className="text-4xl font-bold mb-4">暗号通貨相続アプリ</h1>
        <div className="text-2xl">four Next</div>
      </div>
    </div>

    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-8 mb-12">
      <div className="flex items-center justify-center">
        <p className="text-2xl font-bold text-gray-700 dark:text-gray-200">
          トラストレスな、暗号通貨の相続(資産移転)を実現
        </p>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="bg-purple-50 dark:bg-purple-900/20 border-none p-6 flex items-center">
        <div className="bg-white dark:bg-gray-800 rounded-full p-3 shadow-md mr-4">
          <Calendar className="w-8 h-8 text-purple-500" />
        </div>
        <div>
          <div className="font-semibold">東京大学ブロックチェーン公開講座</div>
          <div className="text-gray-600 dark:text-gray-400">2024年12月10日</div>
        </div>
      </Card>

      <Card className="bg-green-50 dark:bg-green-900/20 border-none p-6">
        <div className="flex items-center mb-3">
          <div className="bg-white dark:bg-gray-800 rounded-full p-3 shadow-md mr-4">
            <User className="w-8 h-8 text-green-500" />
          </div>
          <div>
            <div className="text-gray-600 dark:text-gray-400">発表グループ</div>
            <div className="font-semibold">four Next (G4)</div>
            <div className="text-gray-600 dark:text-gray-400 mt-2">メンター</div>
            <div className="font-semibold">芝野 恭平</div>
          </div>
        </div>
      </Card>
    </div>
  </div>
)

export default TitleSlide

