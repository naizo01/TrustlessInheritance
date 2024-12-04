"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckSquare } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ProgressItem {
  label: string;
  completed: boolean;
  details?: string;
}

interface ProgressSection {
  title: string;
  items: ProgressItem[];
}

const progressSections: ProgressSection[] = [
  {
    title: "設計",
    items: [
      {
        label: "アーキテクチャ",
        completed: true,
        details: "システム全体の設計を完了",
      },
      {
        label: "コントラクト",
        completed: true,
        details: "スマートコントラクトの設計を完了",
      },
      { label: "ZKP", completed: true, details: "ゼロ知識証明の設計を完了" },
      {
        label: "フロントエンド",
        completed: true,
        details: "ユーザーインターフェースの設計を完了",
      },
    ],
  },
  {
    title: "コントラクト",
    items: [
      {
        label: "実装",
        completed: true,
        details: "スマートコントラクトのコーディングを完了",
      },
      {
        label: "ERC7546 proxyパターンの実装",
        completed: true,
        details: "アップグレード可能なコントラクトの実装",
      },
      {
        label: "ZKPのproof検証",
        completed: true,
        details: "ゼロ知識証明の検証ロジックを実装",
      },
      {
        label: "テスト",
        completed: true,
        details: "ユニットテストの作成と実行",
      },
      {
        label: "シナリオテスト",
        completed: true,
        details: "エンドツーエンドのシナリオテストを実施",
      },
      {
        label: "デプロイ",
        completed: true,
        details: "テストネットへのデプロイを完了",
      },
    ],
  },
  {
    title: "ZKP",
    items: [
      {
        label: "秘密情報検証回路",
        completed: true,
        details: "ゼロ知識証明の検証回路を設計",
      },
      {
        label: "秘密情報バリデーション回路",
        completed: true,
        details: "入力データの検証回路を実装",
      },
      {
        label: "proof生成",
        completed: true,
        details: "クライアント側でのproof生成ロジックを実装",
      },
      {
        label: "テスト",
        completed: true,
        details: "ZKPシステムの総合テストを実施",
      },
    ],
  },
  {
    title: "フロントエンド",
    items: [
      {
        label: "ランディングページ",
        completed: true,
        details: "プロジェクト紹介ページを作成",
      },
      {
        label: "ページ作成",
        completed: true,
        details: "主要な機能ページを実装",
      },
      {
        label: "ウォレット接続",
        completed: true,
        details: "Web3ウォレットとの連携を実装",
      },
      {
        label: "コントラクトとの繋ぎ込み",
        completed: true,
        details: "フロントエンドとスマートコントラクトを接続",
      },
      {
        label: "ZKPのproof生成",
        completed: true,
        details: "ブラウザでのZKP生成を実装",
      },
      {
        label: "テスト",
        completed: true,
        details: "UIテストとインテグレーションテストを実施",
      },
    ],
  },
];

// ... existing code ...

const ProjectProgressSlide = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const calculateProgress = (items: ProgressItem[]) => {
    const completedItems = items.filter((item) => item.completed).length;
    return (completedItems / items.length) * 100;
  };

  const totalProgress = calculateProgress(
    progressSections.flatMap((section) => section.items)
  );

  return (
    <div className="w-full max-w-4xl mx-auto p-6 mb-20 space-y-8 animate-fadeIn">
      <h2 className="text-3xl font-bold text-center mb-8">
        プロジェクト進捗状況
      </h2>

      <Card className="p-6 bg-white bg-blue-50">
        <h3 className="text-xl font-bold  mb-4">全体進捗</h3>
        <Progress value={totalProgress} className="h-2 mb-2" />
        <p className="text-sm text-gray-600 dark:text-gray-400 font-bold ">
          {totalProgress.toFixed(0)}% 完了
        </p>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {progressSections.map((section, index) => (
          <motion.div key={index}>
            <Card className="p-6 bg-white bg-blue-50">
              <h3 className="text-xl mb-4 font-bold ">{section.title}</h3>
              <ul className="space-y-2">
                {section.items.map((item, itemIndex) => (
                  <motion.li
                    key={itemIndex}
                    className="flex items-center"
                    onHoverStart={() =>
                      setHoveredItem(`${section.title}-${item.label}`)
                    }
                    onHoverEnd={() => setHoveredItem(null)}
                    whileHover={{ scale: 1.02 }} // スケールを1.02に変更
                    transition={{ duration: 0.2 }} // アニメーションの速度を調整
                  >
                    <CheckSquare
                      className={`w-5 h-5 mr-2 ${
                        item.completed ? "text-green-400" : "text-gray-300"
                      }`}
                    />
                    <span
                      className={
                        item.completed
                          ? "text-gray-700 dark:text-gray-300"
                          : "text-gray-400 dark:text-gray-500"
                      }
                    >
                      {item.label}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProjectProgressSlide;
