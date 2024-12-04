'use client'

import { motion } from 'framer-motion'
import { Shield, Lock, Zap, Coins, UserCircle, ShieldCheck } from 'lucide-react'
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
    { icon: <Coins className="w-6 h-6" />, title: "コスト", desc: "中央管理者不要で運用コストを削減" }
  ]

  const zkpFeatures: FeatureItem[] = [
    { icon: <UserCircle className="w-6 h-6" />, title: "プライバシー", desc: "相続先のアドレスを公開せずに検証可能" },
    { icon: <ShieldCheck className="w-6 h-6" />, title: "安全性", desc: "相続情報を公開せずに、その情報が安全であることを数学的に証明" },
    { icon: <Zap className="w-6 h-6" />, title: "効率性", desc: "検証プロセスが高速で低コスト" }
  ]

  const containerVariants = {
    // hidden: { opacity: 0 },
    // visible: {
    //   opacity: 1,
    //   transition: {
    //     staggerChildren: 0.1
    //   }
    // }
  }

  const itemVariants = {
    // hidden: { opacity: 0, y: 20 },
    // visible: {
    //   opacity: 1,
    //   y: 0,
    //   transition: {
    //     type: 'spring',
    //     stiffness: 100
    //   }
    // }
  }

  const FeatureList = ({ features, bgColor }: { features: FeatureItem[], bgColor: string }) => (
    <Card className={`border-none p-6 ${bgColor}`}>
      <motion.ul
        className="space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {features.map((item, i) => (
          <motion.li
            key={i}
            className="flex items-start gap-4"
            variants={itemVariants}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {item.icon}
            </motion.div>
            <div>
              <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </Card>
  )
  return (
    <div className="w-full max-w-4xl mx-auto p-6 mb-20 space-y-8 animate-fadeIn">
      <section>
        <motion.h2
          className="text-3xl font-bold text-center mb-8" // ProjectProgressSlideに合わせて修正
        >
          なぜブロックチェーンなのか？
        </motion.h2>
        <FeatureList features={blockchainFeatures} bgColor="bg-blue-50 dark:bg-blue-900/20" />
      </section>

      <section>
        <motion.h2
          className="text-3xl font-bold text-center mb-8" // ProjectProgressSlideに合わせて修正
        >
          なぜZKPなのか？
        </motion.h2>
        <FeatureList features={zkpFeatures} bgColor="bg-purple-50 dark:bg-purple-900/20" />
      </section>
    </div>
  )
}

export default WhyBlockchainSlide

