import { Shield, Lock, UserCircle, Zap, CheckCircle } from 'lucide-react'
import { Card } from "@/components/ui/card"

const SolutionSlide = () => {
  const requirements = [
    {
      icon: <Shield className="w-10 h-10 text-blue-500" />,
      title: "第三者への信頼が不要",
      description: "スマートコントラクトによる自動実行で、第三者機関や仲介者に依存しない仕組み",
      bgColor: "bg-blue-50 dark:bg-blue-900/20"
    },
    {
      icon: <Lock className="w-10 h-10 text-green-500" />,
      title: "生前の資産は安全に保管",
      description: "相続予定者が事前に資産を奪うことは不可能にする必要",
      bgColor: "bg-green-50 dark:bg-green-900/20"
    },
    {
      icon: <UserCircle className="w-10 h-10 text-purple-500" />,
      title: "プライバシー保護",
      description: "生前に、相続情報が保護される仕組みが必要",
      bgColor: "bg-purple-50 dark:bg-purple-900/20"
    }
  ]

  return (
    <div className="w-full max-w-4xl mx-auto p-3 mb-20 space-y-4 animate-fadeIn">
      <h2 className="text-3xl font-bold text-center mb-6">理想的な相続の要件</h2>

      <div className="grid gap-6">
        {requirements.map((req, index) => (
          <Card
            key={index}
            className={`${req.bgColor} border-none p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-xl`}
          >
            <div className="flex items-center">
              <div className="bg-white dark:bg-gray-800 rounded-full p-3 shadow-md">
                {req.icon}
              </div>
              <div className="ml-6">
                <h3 className="text-xl font-bold mb-2">{req.title}</h3>
                <p className="text-gray-700 dark:text-gray-300">{req.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-12 text-center space-y-4">
        <p className="text-2xl font-bold">これらを全て実現する</p>
        <Card className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 text-white border-none p-8 transform hover:scale-105 transition-transform duration-300">
          <div className="flex items-center justify-center">
            <Zap className="w-10 h-10 mr-4" />
            <p className="text-2xl font-bold">
              ZK証明を使った相続アプリケーション<br />"four next"を開発しました
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}
export default SolutionSlide;