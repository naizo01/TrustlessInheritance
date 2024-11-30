"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Shield, Lock, UserCircle, ChevronLeft, ChevronRight, Zap, Building2, Key, FileText, AlertTriangle, Calendar, User, Coins, ShieldCheck, Code2, SplitSquareVertical, Layers, CheckCircle2, LockKeyhole } from 'lucide-react'

export function Presentation() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const TitleSlide = () => (
    <div className="space-y-8 animate-fadeIn">
      <div className="text-center mb-12">
        <div className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl p-8 shadow-lg transform hover:scale-105 transition-transform duration-300">
          <h1 className="text-4xl font-bold mb-4">暗号通貨相続アプリ</h1>
          <div className="text-xl">four Next</div>
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-8 mb-12 transform transition-all duration-300 hover:shadow-xl">
        <div className="flex items-center justify-center">
          {/* <div className="bg-white dark:bg-gray-800 rounded-full p-3 shadow-md mr-4">
            <Coins className="w-12 h-12 text-blue-500" />
          </div> */}
          <p className="text-2xl font-bold text-gray-700 dark:text-gray-200">
            完全なトラストレスな、暗号通貨の相続(資産移転)を実現します。
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-purple-50 dark:bg-purple-900/20 border-none p-6 flex items-center transform hover:scale-105 transition-transform duration-300">
          <div className="bg-white dark:bg-gray-800 rounded-full p-3 shadow-md mr-4">
            <Calendar className="w-8 h-8 text-purple-500" />
          </div>
          <div>
            <div className="font-semibold">東京大学ブロックチェーン公開講座</div>
            <div className="text-gray-600 dark:text-gray-400">2024年12月10日</div>
          </div>
        </Card>

        <Card className="bg-green-50 dark:bg-green-900/20 border-none p-6 flex items-center transform hover:scale-105 transition-transform duration-300">
          <div className="bg-white dark:bg-gray-800 rounded-full p-3 shadow-md mr-4">
            <User className="w-8 h-8 text-green-500" />
          </div>
          <div>
            <div className="text-gray-600 dark:text-gray-400">発表グループ</div>
            <div className="font-semibold">four Next</div>
          </div>
        </Card>
      </div>
    </div>
  )

  const CurrentMethodsSlide = () => {
    const methods = [
      {
        icon: <Key className="w-12 h-12 text-blue-500" />,
        title: "秘密鍵の直接共有",
        risks: ["生前に資産が移動されるリスク", "秘密鍵を紛失するリスク"],
        bgColor: "bg-blue-50 dark:bg-blue-900/20"
      },
      {
        icon: <FileText className="w-12 h-12 text-green-500" />,
        title: "遺言書での対応",
        risks: ["法務局などの第三者機関を信用する必要がある"],
        bgColor: "bg-green-50 dark:bg-green-900/20"
      },
      {
        icon: <Lock className="w-12 h-12 text-purple-500" />,
        title: "金庫での保管",
        risks: [
          "開け方を共有する場合、誰かを信用する必要がある",
          "開け方を共有しない場合、死後、開けられなくなる可能性がある"
        ],
        bgColor: "bg-purple-50 dark:bg-purple-900/20"
      },
      {
        icon: <Building2 className="w-12 h-12 text-orange-500" />,
        title: "取引所などに預ける",
        risks: ["死後、相続処理が大変", "取引所のセキュリティリスク"],
        bgColor: "bg-orange-50 dark:bg-orange-900/20"
      }
    ]

    return (
      <div className="space-y-8 animate-fadeIn">
        <h2 className="text-3xl font-bold text-center mb-8">現在の一般的な相続方法</h2>

        <div className="grid gap-6">
          {methods.map((method, index) => (
            <Card
              key={index}
              className={`${method.bgColor} border-none p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-xl`}
            >
              <div className="flex items-center">
                <div className="bg-white dark:bg-gray-800 rounded-full p-3 shadow-md">
                  {method.icon}
                </div>
                <div className="ml-6">
                  <h3 className="text-xl font-bold mb-2">{method.title}</h3>
                  <ul className="space-y-2">
                    {method.risks.map((risk, i) => (
                      <li key={i} className="flex items-start">
                        <div className="w-2 h-2 bg-red-500 rounded-full mr-2 mt-1.5" />
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
          <Card className="bg-red-50 dark:bg-red-900/20 border-none p-8 transform hover:scale-105 transition-transform duration-300">
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

  const SolutionSlide = () => {
    const requirements = [
      {
        icon: <Shield className="w-12 h-12 text-blue-500" />,
        title: "第三者への信頼が不要",
        description: "スマートコントラクトによる自動実行で、第三者機関や仲介者に依存しない仕組み",
        bgColor: "bg-blue-50 dark:bg-blue-900/20"
      },
      {
        icon: <Lock className="w-12 h-12 text-green-500" />,
        title: "生前の資産は安全に保管",
        description: "相続予定者が事前に資産を奪うことは不可能にする必要",
        bgColor: "bg-green-50 dark:bg-green-900/20"
      },
      {
        icon: <UserCircle className="w-12 h-12 text-purple-500" />,
        title: "プライバシー保護",
        description: "生前に、相続情報が保護される仕組みが必要",
        bgColor: "bg-purple-50 dark:bg-purple-900/20"
      }
    ]

    return (
      <div className="space-y-8 animate-fadeIn">
        <h2 className="text-3xl font-bold text-center mb-8">理想的な相続の要件</h2>

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
                ZK証明を使った相続アプリケーション<br />を開発しました
              </p>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  const TechnicalFeaturesSlide = () => {
    const [activeFeature, setActiveFeature] = useState(null)

    const features = [
      {
        icon: <ShieldCheck className="w-12 h-12 text-purple-500" />,
        title: "ZK検証による秘密情報認証",
        description: "生前の相続先を完全に秘匿化",
        details: [
          "相続先のアドレスを公開せずに検証可能",
          "プライバシーと安全性を両立"
        ],
        bgColor: "bg-purple-50 dark:bg-purple-900/20",
        code: "// ZK Proofの検証例\nfunction verifyProof(\n  bytes calldata proof,\n  bytes32 commitment\n) public view returns (bool) {\n  return zkVerifier.verify(proof, commitment);\n}"
      },
      {
        icon: <LockKeyhole className="w-12 h-12 text-blue-500" />,
        title: "ZK検証によるバリデーション",
        description: "秘密情報を秘匿化したまま、秘密情報が安全であることを証明",
        details: [
          "8文字以上の文字列であることを検証",
          "単一文字列でないことを確認",
        ],
        bgColor: "bg-blue-50 dark:bg-blue-900/20",
        code: "// 秘密情報の要件をZK回路で検証\ncircuit SecretInfoValidator {\n  signal input secret[32];\n  signal output valid;\n  // 長さと複雑性の検証ロジック\n}"
      },
      {
        icon: <Layers className="w-12 h-12 text-green-500" />,
        title: "ERC7546 UCSプロキシパターン",
        description: "効率的なコントラクト管理",
        details: [
          "ユーザーごとに独立したプロキシを生成",
          "デプロイ時のガス代を最適化",
          "ユーザーごと分離された残高管理"
        ],
        bgColor: "bg-green-50 dark:bg-green-900/20",
        code: "// プロキシコントラクトの生成\nfunction createProxy(\n  address implementation\n) external returns (address) {\n  return new UCSProxy(implementation);\n}"
      },
      {
        icon: <SplitSquareVertical className="w-12 h-12 text-orange-500" />,
        title: "Web3フレームワークを利用したフロントエンド",
        description: "next.js、wagmi、viem、connectkit、snarkjsを使用",
        details: [
          "フロントエンドで、安全にZKのproof生成",
          "シームレスなウォレット連携"
        ],
        bgColor: "bg-orange-50 dark:bg-orange-900/20",
        code: "// wagmiフックの使用例\nconst { data, signMessage } = useSignMessage({\n  message: 'Verify Ownership'\n});"
      }
    ]

    return (
      <div className="w-full max-w-4xl mx-auto p-6 space-y-8 animate-fadeIn">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">技術的特徴</h2>
          <p className="text-gray-600 dark:text-gray-400">最新のブロックチェーン技術を活用した安全な相続システム</p>
        </div>

        <div className="grid gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className={`${feature.bgColor} border-none p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer`}
              onClick={() => setActiveFeature(activeFeature === index ? null : index)}
            >
              <div className="flex items-start">
                <div className="bg-white dark:bg-gray-800 rounded-full p-3 shadow-md">
                  {feature.icon}
                </div>
                <div className="ml-6 flex-grow">
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">{feature.description}</p>

                  {activeFeature === index && (
                    <div className="mt-4 space-y-4">
                      <Card className="bg-white dark:bg-gray-800 border-none p-4">
                        <h4 className="font-semibold mb-2">主な利点:</h4>
                        <ul className="space-y-2">
                          {feature.details.map((detail, i) => (
                            <li key={i} className="flex items-center">
                              <CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />
                              <span className="text-gray-700 dark:text-gray-300">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </Card>
                      {/* <Card className="bg-gray-800 text-gray-200 border-none p-4">
                        <pre className="text-sm overflow-x-auto">
                          <code>{feature.code}</code>
                        </pre>
                      </Card> */}
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  const SystemOverviewSlide = () => (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-8 animate-fadeIn">
      <h2 className="text-3xl font-bold text-center mb-8">システム概要図</h2>
      <Card className="border-none overflow-hidden">
        <img
          src="/placeholder.svg?height=600&width=800"
          alt="システム概要図"
          className="w-full h-auto object-contain"
        />
      </Card>
      <p className="text-center text-gray-600 dark:text-gray-400">
        暗号資産相続アプリケーションのシステム構成と主要コンポーネントの概要
      </p>
    </div>
  )

  const ServiceFlowSlide = () => (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-8 animate-fadeIn">
      <h2 className="text-3xl font-bold text-center mb-8">サービスフロー</h2>
      <Card className="border-none overflow-hidden">
      <img
          src="/PairProof-相続の流れ.drawio.png"
          alt="サービスフロー"
          className="w-full h-auto object-contain"
        />
      </Card>
      <p className="text-center text-gray-600 dark:text-gray-400">
        ユーザーの視点から見た暗号資産相続プロセスの流れ
      </p>
    </div>
  )

  const ContractDesignSlide = () => (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-8 animate-fadeIn">
      <h2 className="text-3xl font-bold text-center mb-8">コントラクト設計</h2>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2 space-y-6">
          <Card className="border-none p-6 bg-purple-50 dark:bg-purple-900/20">
            <h3 className="text-xl font-bold mb-4">①InheritanceFactory</h3>
            <p className="text-gray-700 dark:text-gray-300">
              InheritanceFactoryは、各ユーザーごとに相続管理コントラクト（InheritanceContract）のプロキシをデプロイし、初期化するためのコントラクトです。これにより、ユーザーごとに独立した相続設定を構築できます。
            </p>
          </Card>

          <Card className="border-none p-6 bg-blue-50 dark:bg-blue-900/20">
            <h3 className="text-xl font-bold mb-4">②InheritanceContract</h3>
            <p className="text-gray-700 dark:text-gray-300">
              InheritanceContractは、ERC7546 により構築されたコントラクトで、相続者の確認とトークン相続の処理を担います。安全性を高めるために1ユーザーごとに専用のプロキシが割り当てられ、他のユーザーとapprove 先が競合することなくトークンが管理されます。
            </p>
          </Card>
        </div>

        <div className="w-full md:w-1/2">
          <Card className="border-none overflow-hidden h-full">
            <img
              src="/contract.png"
              alt="コントラクト設計図"
              className="w-full h-full object-contain"
            />
          </Card>
        </div>
      </div>
    </div>
  )

  const slides = [
    <TitleSlide key="title" />,
    <CurrentMethodsSlide key="current" />,
    <SolutionSlide key="solution" />,
    <TechnicalFeaturesSlide key="technical" />,
    <SystemOverviewSlide key="system-overview" />,
    <ServiceFlowSlide key="service-flow" />,
    <ContractDesignSlide key="contract-design" />,
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-[800px] mx-auto">
        {slides[currentSlide]}

        <div className="fixed bottom-8 right-8 flex space-x-4">
          <Button
            onClick={() => setCurrentSlide(prev => Math.max(0, prev - 1))}
            disabled={currentSlide === 0}
            variant="outline"
            className="hover:scale-105 transition-transform duration-300"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            前へ
          </Button>
          <Button
            onClick={() => setCurrentSlide(prev => Math.min(slides.length - 1, prev + 1))}
            disabled={currentSlide === slides.length - 1}
            className="hover:scale-105 transition-transform duration-300"
          >
            次へ
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        <div className="fixed bottom-8 left-8">
          <Card className="px-4 py-2 border-none">
            {currentSlide + 1} / {slides.length}
          </Card>
        </div>
      </div>
    </div>
  )
}