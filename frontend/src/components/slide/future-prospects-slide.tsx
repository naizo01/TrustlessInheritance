'use client'
import { Rocket, Lock, Coins, ChartBar } from 'lucide-react'
import { Card } from '@/components/ui/card'

interface ProspectItem {
  icon: React.ReactNode
  title: string
  desc: string
}

const FutureProspectsSlide = () => {
  const stepOne: ProspectItem[] = [
    { 
      icon: <Rocket className="w-6 h-6" />, 
      title: "オープンソースリリース", 
      desc: "まずはOSSとしてサービスを公開し、透明性の高い開発とコミュニティ形成を進めます" 
    }
  ];

  const stepTwo: ProspectItem[] = [
    { 
      icon: <Lock className="w-6 h-6" />, 
      title: "トークンロックと投票権", 
      desc: "ガバナンストークンのロック期間に応じて投票権を付与し、長期的なコミットメントを促進します" 
    },
    { 
      icon: <Coins className="w-6 h-6" />, 
      title: "プロトコル手数料の分配", 
      desc: "ロック期間に比例して手数料を分配することで、持続可能な運営体制を確立します" 
    },
    { 
      icon: <ChartBar className="w-6 h-6" />, 
      title: "トークン発行計画", 
      desc: "線形なガバナンストークンの追加発行により、健全なエコシステムの成長を実現します" 
    }
  ];

  const ProspectList = ({ items, bgColor }: { items: ProspectItem[], bgColor: string }) => (
    <Card className={`border-none p-6 ${bgColor}`}>
      <ul className="space-y-6">
        {items.map((item, i) => (
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
          今後の展望
        </h2>
        <h3 className="text-2xl font-semibold mb-4">第一ステップ</h3>
        <ProspectList items={stepOne} bgColor="bg-purple-50 dark:bg-purple-900/20" />
        <h3 className="text-2xl font-semibold mt-8 mb-4">第二ステップ</h3>
        <ProspectList items={stepTwo} bgColor="bg-purple-50 dark:bg-purple-900/20" />
      </section>
    </div>
  )
}

export default FutureProspectsSlide