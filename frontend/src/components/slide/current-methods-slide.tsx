'use client'

import { Card } from "@/components/ui/card"
import { Key, FileText, Lock, Building2, AlertTriangle } from 'lucide-react'

const CurrentMethodsSlide = () => {
  const methods = [
    {
      icon: <Key className="w-10 h-10 text-blue-500" />,
      title: "秘密鍵の直接共有",
      risks: ["生前に資産が移動されるリスク", "秘密鍵を紛失するリスク"],
      bgColor: "bg-blue-50 dark:bg-blue-900/20"
    },
    {
      icon: <FileText className="w-10 h-10 text-green-500" />,
      title: "遺言書での対応",
      risks: ["法務局などの第三者機関を信用する必要がある"],
      bgColor: "bg-green-50 dark:bg-green-900/20"
    },
    {
      icon: <Lock className="w-10 h-10 text-purple-500" />,
      title: "金庫での保管",
      risks: [
        "開け方を共有する場合、誰かを信用する必要がある",
        "死後、開けられなくなる可能性がある"
      ],
      bgColor: "bg-purple-50 dark:bg-purple-900/20"
    },
    {
      icon: <Building2 className="w-10 h-10 text-orange-500" />,
      title: "取引所などに預ける",
      risks: ["死後、相続処理が大変", "自己管理できない"],
      bgColor: "bg-orange-50 dark:bg-orange-900/20"
    }
  ]

  return (
    <div className="w-full max-w-4xl mx-auto p-3 mb-20 space-y-4 animate-fadeIn">
      <h2 className="text-3xl font-bold text-center mb-6">現在の一般的なCrypto資産相続方法</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {methods.map((method, index) => (
          <Card
            key={index}
            className={`${method.bgColor} border-none p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-xl`}
          >
            <div className="flex items-center h-full">
              <div className="bg-white dark:bg-gray-800 rounded-full p-3 shadow-md">
                {method.icon}
              </div>
              <div className="ml-6">
                <h3 className="text-xl font-bold mb-2">{method.title}</h3>
                <ul className="space-y-2">
                  {method.risks.map((risk, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-gray-700 dark:text-gray-300">{risk}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <Card className="mt-8 bg-red-50 dark:bg-red-900/20 border-none p-8 transform hover:scale-105 transition-transform duration-300">
          <div className="flex items-center text-red-700 dark:text-red-400">
            <AlertTriangle className="w-10 h-10 mr-4" />
            <p className="text-2xl font-bold">
              現状、安全に暗号資産を相続するためには、<br />
              「第三者への信頼」が必要です。
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default CurrentMethodsSlide