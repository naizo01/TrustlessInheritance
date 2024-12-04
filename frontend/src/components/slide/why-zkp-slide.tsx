'use client'

import { UserCircle, ShieldCheck, Zap } from 'lucide-react'
import { Card } from '@/components/ui/card'

interface FeatureItem {
  icon: React.ReactNode
  title: string
  desc: string
}

const WhyZKPSlide = () => {
  const zkpFeatures: FeatureItem[] = [
    { icon: <UserCircle className="w-6 h-6" />, title: "プライバシー", desc: "相続先のアドレスを公開せずに検証可能" },
    { icon: <ShieldCheck className="w-6 h-6" />, title: "安全性", desc: "相続情報を公開せずに、その情報が安全であることを数学的に証明" },
    { icon: <Zap className="w-6 h-6" />, title: "効率性", desc: "検証プロセスが高速で低コスト" }
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
          なぜZKPなのか？
        </h2>
        <FeatureList features={zkpFeatures} bgColor="bg-purple-50 dark:bg-purple-900/20 mt-10" />
      </section>
    </div>
  )
}

export default WhyZKPSlide