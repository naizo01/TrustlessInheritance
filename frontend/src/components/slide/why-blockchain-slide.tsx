'use client'

import { Shield, Lock, Zap, Coins, Link } from 'lucide-react'
import { Card } from '@/components/ui/card'

interface FeatureItem {
  icon: React.ReactNode
  title: string
  desc: string
}

const WhyBlockchainSlide = () => {
  const blockchainFeatures: FeatureItem[] = [
    { icon: <Shield className="w-6 h-6" />, title: "信頼性", desc: "スマートコントラクトによる自動実行で中央集権的な管理者不要" },
    { icon: <Lock className="w-6 h-6" />, title: "透明性", desc: "コードが公開され誰でも検証可能" },
    { icon: <Zap className="w-6 h-6" />, title: "可用性", desc: "24/365稼働でシステム停止リスクが極めて低い" },
    { icon: <Coins className="w-6 h-6" />, title: "コスト", desc: "中央管理者不要で運用コストを削減" },
    { icon: <Link className="w-6 h-6" />, title: "親和性", desc: "暗号資産の相続に関する処理をブロックチェーン上で直接実行可能" }
  ]

  const FeatureList = ({ features, bgColor }: { features: FeatureItem[], bgColor: string }) => (
    <Card className={`border-none p-6 ${bgColor}`}>
      <ul className="space-y-6">
        {features.map((item, i) => (
          <li key={i} className="flex items-start gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg">
              {item.icon}
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  )

  return (
    <div className="w-full max-w-4xl mx-auto p-3 mb-20 space-y-4 animate-fadeIn">
      <section>
        <h2 className="text-3xl font-bold text-center mb-6">
          なぜブロックチェーンなのか？
        </h2>
        <FeatureList features={blockchainFeatures} bgColor="bg-blue-50 dark:bg-blue-900/20" />
      </section>
    </div>
  )
}

export default WhyBlockchainSlide