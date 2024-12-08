"use client";

import { Card } from "@/components/ui/card";
import {
  ShieldCheck,
  LockKeyhole,
  Layers,
  SplitSquareVertical,
  CheckCircle2,
} from "lucide-react";

const TechnicalFeaturesSlide = () => {
  const features = [
    {
      icon: <ShieldCheck className="w-10 h-10 text-purple-500" />,
      title: "ZK検証による秘密情報認証",
      description: "生前の相続先を完全に秘匿化",
      details: [
        "相続先のアドレスを公開せずに検証可能",
        "プライバシーと安全性を両立",
      ],
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
    },
    {
      icon: <LockKeyhole className="w-10 h-10 text-blue-500" />,
      title: "ZK検証によるバリデーション",
      description: "秘密情報を秘匿化したまま、秘密情報が安全であることを証明",
      details: [
        "8文字以上の文字列であることを検証",
        "単一文字列でないことを確認",
      ],
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      icon: <Layers className="w-10 h-10 text-green-500" />,
      title: "UCSプロキシパターン",
      details: [
        "ERC7546を採用(クローンとアップグレードが両立可能)",
        "MC(MetaContract)を利用し、ユーザーごとのproxyを生成",
        "ユーザーごと分離された残高管理",
      ],
      bgColor: "bg-green-50 dark:bg-green-900/20",
    },
    {
      icon: <SplitSquareVertical className="w-10 h-10 text-orange-500" />,
      title: "最新のフレームワークを利用したフロントエンド",
      details: [
        "next.js、wagmi、viem、connectkit、snarkjsを使用",
        "フロントエンドで、安全にZKのproof生成",
        "シームレスなウォレット連携",
      ],
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto p-3 mb-20 space-y-4 animate-fadeIn">
      <h2 className="text-3xl font-bold text-center mb-6">技術的特徴</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {features.map((feature, index) => (
          <Card
            key={index}
            className={`${feature.bgColor} border-none p-6 transition-all duration-300 hover:shadow-xl`}
          >
            <div className="flex items-center gap-6 h-full">
              <div className="bg-white dark:bg-gray-800 rounded-full p-3 shadow-md">
                {feature.icon}
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <Card className="bg-white dark:bg-gray-800 border-none p-4 mt-4">
                  <ul className="space-y-2">
                    {feature.details.map((detail, i) => (
                      <li key={i} className="flex items-center">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">
                          {detail}
                        </span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TechnicalFeaturesSlide;