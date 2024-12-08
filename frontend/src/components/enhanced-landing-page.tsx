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
  Clock,
} from "lucide-react";
import { Header } from "@/components/common/variable-header";
import Image from 'next/image';
import { Footer } from "@/components/common/footer";

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
      />
      <main className="pt-16">
        <section className="relative h-screen w-full overflow-hidden">
          <Image
            src="/images/main_visual.png"
            alt="MainVisual"
            layout="fill"
            objectFit="cover"
            quality={100}
            priority
          />
          <div className="absolute inset-0 bg-black/20" />
          
          <div className="relative z-10 h-full container mx-auto flex flex-col justify-start items-start pt-20">
            <div className="max-w-3xl px-4 sm:px-6 lg:px-8 space-y-6 mb-12">
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white tracking-wide">
                four next
              </h1>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl text-white font-medium leading-relaxed">
              トラストレス相続アプリケーション
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-white/90 font-light leading-relaxed max-w-2xl">
                ZK証明でプライバシーを守りながら安全確実に暗号資産の相続
              </p>
            </div>
            <div className="w-full flex justify-center mt-auto mb-64">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
                onClick={() => window.location.href = "/alice"} // /alice ページに遷移
              >
                相続を設定する
              </Button>
            </div>
          </div>
        </section>

        <section id="features" className="py-20 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
              特徴
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "第三者依存なし",
                  description: "スマートコントラクトによる自動実行で、仲介者不要",
                  icon: Shield,
                },
                {
                  title: "完全なプライバシー",
                  description: "ZK証明により相続情報を保護",
                  icon: Eye,
                },
                {
                  title: "資産の安全性",
                  description: "生前の資産は確実に保護",
                  icon: Lock,
                },
                {
                  title: "透明性の確保",
                  description: "全ての処理が検証可能",
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
              相続の流れ
            </h2>
            <div className="relative">
              <div className="absolute left-8 top-4 bottom-4 w-0.5 bg-blue-600 dark:bg-blue-400"></div>
              <ol className="space-y-10">
                {[
                  {
                    icon: Lock,
                    title: "相続設定",
                    description: "秘密情報とロック期間を設定します",
                  },
                  {
                    icon: Coins,
                    title: "承認トークン設定",
                    description: "相続管理コントラクトに転送権限を与えるトークンを設定します",
                  },
                  {
                    icon: UserPlus,
                    title: "相続申請",
                    description: "相続先が秘密情報を提示し、ZK証明で検証します",
                  },
                  {
                    icon: Clock,
                    title: "ロック期間",
                    description: "設定された期間、資産がロックされます",
                  },
                  {
                    icon: Unlock,
                    title: "相続実行",
                    description: "ロック期間後、資産が自動的に移転されます",
                  }
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
              重要な注意事項
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
                          相続設定時の注意
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-700 dark:text-gray-300">
                      秘密情報は8文字以上で、単一文字列以外の文字列を使用してください。この情報は相続先とのみ共有し、決して第三者に開示しないでください。
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
                          ロック期間について
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-700 dark:text-gray-300">
                      ロック期間中は相続の取り消しが可能です。不正な相続申請があった場合は、必ずこの期間中に取り消し操作を行ってください。
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
              安全な暗号資産の相続を実現
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              第三者に依存せず、プライバシーを守りながら確実な資産継承を
            </p>
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
              onClick={() => window.location.href = "/alice"}
            >
              相続を設定する
            </Button>
          </div>
        </section>
      </main>
      <Footer scrollToSection={scrollToSection}/>
    </div>
  );
}