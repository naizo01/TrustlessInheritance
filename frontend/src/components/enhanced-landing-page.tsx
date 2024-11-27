"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  AlertCircle,
  Wallet,
  Lock,
  UserPlus,
  FileText,
  Coins,
  ClipboardCheck,
  Unlock,
  Menu,
  Shield,
  Eye,
  Sliders,
  Layers,
} from "lucide-react";
// import { Header } from "@/components/common/Header";
import { Header } from "@/components/common/variable-header";

export function EnhancedLandingPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Header
        scrolled={scrolled}
        scrollToSection={scrollToSection}
        showLandingPageButtons={true}
        appBadgeText=""
        appBadgeClassName=""
      />{" "}
      {/* Headerコンポーネントを使用 */}
      <main className="pt-16">
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="https://g-qgytzacqry5.vusercontent.net/placeholder.svg?height=1080&width=1920"
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black opacity-50"></div>
          </div>
          <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
              大切な暗号資産を、
              <br className="sm:hidden" />
              確実に未来へ
            </h2>
            <p className="text-xl sm:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
              最新のブロックチェーン技術で実現する、次世代型資産継承ソリューション
            </p>
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
            >
              今すぐ始める
            </Button>
          </div>
        </section>

        <section id="features" className="py-20 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
              アプリケーションの特徴
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "強固なセキュリティ",
                  description: "ブロックチェーン技術による堅牢なセキュリティ",
                  icon: Shield,
                },
                {
                  title: "プライバシー保護",
                  description: "ZK証明方式による匿名性の確保",
                  icon: Eye,
                },
                {
                  title: "柔軟な設定",
                  description: "カスタマイズ可能なロック期間",
                  icon: Sliders,
                },
                {
                  title: "幅広い資産対応",
                  description: "複数の暗号資産を一括管理",
                  icon: Layers,
                },
              ].map((feature, index) => (
                <Card
                  key={index}
                  className="bg-gray-50 dark:bg-gray-800 border-none shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <CardHeader>
                    <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                      <feature.icon
                        className="h-8 w-8 text-blue-600 dark:text-blue-300"
                        aria-hidden="true"
                      />
                    </div>
                    <CardTitle className="text-xl font-semibold text-center text-gray-900 dark:text-white">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center text-gray-600 dark:text-gray-300">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="how-to-use" className="py-20 bg-gray-100 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
              使い方
            </h2>
            <div className="relative">
              <div className="absolute left-8 top-4 bottom-4 w-0.5 bg-blue-600 dark:bg-blue-400"></div>
              <ol className="space-y-10">
                {[
                  {
                    icon: Wallet,
                    title: "ウォレット接続",
                    description: "ご自身の暗号資産ウォレットを接続します。",
                  },
                  {
                    icon: Lock,
                    title: "ロック期間設定",
                    description: "相続開始後のロック期間を設定します。",
                  },
                  {
                    icon: UserPlus,
                    title: "相続人情報登録",
                    description: "相続人の情報を登録します。",
                  },
                  {
                    icon: FileText,
                    title: "秘密情報登録",
                    description: "相続人との間で共有した秘密情報を登録します。",
                  },
                  {
                    icon: Coins,
                    title: "資産選択",
                    description: "相続を許可する暗号資産を選択します。",
                  },
                  {
                    icon: ClipboardCheck,
                    title: "相続申請受付",
                    description: "相続人からの相続申請を受け付けます。",
                  },
                  {
                    icon: Unlock,
                    title: "ロック解除と相続完了",
                    description: "ロック期間経過後、相続手続きが完了します。",
                  },
                ].map((step, index) => (
                  <li key={index} className="relative pl-20">
                    <div className="absolute left-0 top-0 bg-blue-600 dark:bg-blue-400 rounded-full w-16 h-16 flex items-center justify-center">
                      <step.icon
                        className="h-8 w-8 text-white"
                        aria-hidden="true"
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {step.description}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section id="cautions" className="py-20 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
              注意事項
            </h2>
            <Card className="bg-gray-50 dark:bg-gray-800 border-none shadow-lg">
              <CardContent className="pt-6">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-left">
                      <div className="flex items-center space-x-2">
                        <AlertCircle
                          className="h-5 w-5 text-red-500"
                          aria-hidden="true"
                        />
                        <span className="text-gray-900 dark:text-white font-semibold">
                          不正な相続申請への対応
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-700 dark:text-gray-300">
                      不正な相続申請が行われた場合、ロック期間中に必ず取り消してください。ロック期間中は資産所有者が取り消し操作を行うことができます。
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger className="text-left">
                      <div className="flex items-center space-x-2">
                        <AlertCircle
                          className="h-5 w-5 text-red-500"
                          aria-hidden="true"
                        />
                        <span className="text-gray-900 dark:text-white font-semibold">
                          秘密情報の取り扱い
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-700 dark:text-gray-300">
                      ZK証明方式で用いる秘密情報は、あなたと相続人の間で共有する特別な情報です。絶対に第三者に漏らさないようにご注意ください。
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="py-20 bg-gray-100 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              かけがえのない資産を、確実に未来につなぐ
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              次世代の資産継承　あなたの大切な方へ、想いをつなぐ第一歩を
            </p>
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
            >
              無料で始める
            </Button>
          </div>
        </section>
      </main>
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">暗号資産相続アプリ</h3>
              <p className="text-gray-400">
                安全で簡単な暗号資産の相続をサポートします。
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">リンク</h3>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => scrollToSection("features")}
                    className="text-gray-400 hover:text-white  transition-colors"
                  >
                    特徴
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("how-to-use")}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    使い方
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("cautions")}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    注意事項
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">お問い合わせ</h3>
              <p className="text-gray-400">
                ご質問やサポートが必要な場合は、お気軽にお問い合わせください。
              </p>
              <a
                href="mailto:support@example.com"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                support@example.com
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center">
            <p className="text-gray-400">
              © 2024 暗号資産相続アプリケーション. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
