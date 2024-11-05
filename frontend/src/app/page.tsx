"use client";

import { useState, useEffect } from "react";
import Button from "@mui/material/Button";

// import Button from "@/app/_components/Button";
// import Card from "@/app/_components/Card";
// import Accordion from "@/app/_components/Accordion";
// import Menu from "@/app/_components/Menu";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@mui/material";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
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

export default function Page() {
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
    <div className="min-h-screen">
      <header
        className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "backdrop-blur-md shadow-md" : ""}`}
      >
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          {/* <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            暗号資産相続アプリ
          </h1> */}
          <Button
            onClick={() => setIsOpen(!isOpen)}
            variant="ghost"
            size="sm"
            className="sm:hidden"
          >
            {/* <Menu className="h-6 w-6" /> */}
          </Button>
          <nav className="hidden sm:block">
            <ul className="flex space-x-6">
              <li>
                <button
                  onClick={() => scrollToSection("features")}
                  className="text-slate-800 hover:text-accent-400"
                >
                  特徴
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("how-to-use")}
                  className="text-slate-800 hover:text-accent-400"
                >
                  使い方
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("cautions")}
                  className="text-slate-800 hover:text-accent-400"
                >
                  注意事項
                </button>
              </li>
            </ul>
          </nav>
        </div>
        {isOpen && (
          <nav className="sm:hidden bg-white dark:bg-gray-800 shadow-lg">
            <ul className="flex flex-col space-y-2 p-4">
              <li>
                <button
                  onClick={() => scrollToSection("features")}
                  className="block w-full text-left py-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
                >
                  特徴
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("how-to-use")}
                  className="block w-full text-left py-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
                >
                  使い方
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("cautions")}
                  className="block w-full text-left py-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
                >
                  注意事項
                </button>
              </li>
            </ul>
          </nav>
        )}
      </header>

      <main className="pt-16">
        <section className="relative h-screen flex items-center justify-center overflow-hidden bg-white">
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
            <p className="text-xl sm:text-2xl text-gray-200 mb-8 max-w-4xl mx-auto">
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

        {/* <section id="features" className="py-20 bg-white ">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
              アプリケーションの特徴
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "高度な安全性",
                  description: "ブロックチェーン技術による堅牢なセキュリティ",
                  icon: Shield,
                },
                {
                  title: "プライバシー保護",
                  description: "ZK署名方式による匿名性の確保",
                  icon: Eye,
                },
                {
                  title: "柔軟な設定",
                  description: "カスタマイズ可能なロック期間",
                  icon: Sliders,
                },
                {
                  title: "多様な対応",
                  description: "複数の暗号資産に対応",
                  icon: Layers,
                },
              ].map((feature, index) => (
                <Card
                  key={index}
                  className="bg-gray-50  border-none shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <CardHeader>
                    <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                      <feature.icon
                        className="h-8 w-8 text-blue-600 dark:text-blue-300"
                        aria-hidden="true"
                      />
                    </div>
                    <CardTitle className="text-xl font-semibold text-center text-gray-900 ">
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
        </section> */}

        <section id="features" className="py-20 bg-white " data-id="33">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-id="34">
            <h2
              className="text-3xl font-bold text-center text-gray-900 mb-12 "
              data-id="35"
            >
              アプリケーションの特徴
            </h2>
            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
              data-id="36"
            >
              <div
                className="rounded-lg border text-card-foreground bg-gray-50  border-none shadow-lg hover:shadow-xl transition-shadow duration-300"
                data-id="37"
                data-v0-t="card"
              >
                <div className="flex flex-col space-y-1.5 p-6" data-id="38">
                  <div
                    className="w-16 h-16 mx-auto mb-4 bg-blue-100  rounded-full flex items-center justify-center"
                    data-id="39"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="lucide lucide-shield h-8 w-8 text-blue-600 "
                      aria-hidden="true"
                      data-id="40"
                    >
                      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
                    </svg>
                  </div>
                  <h3
                    className="tracking-tight text-xl font-semibold text-center text-gray-900 "
                    data-id="41"
                  >
                    強固なセキュリティ
                  </h3>
                </div>
                <div className="p-6 pt-0" data-id="42">
                  <p className="text-center text-gray-600 " data-id="43">
                    ブロックチェーン技術による堅牢なセキュリティ
                  </p>
                </div>
              </div>
              <div
                className="rounded-lg border text-card-foreground bg-gray-50 border-none shadow-lg hover:shadow-xl transition-shadow duration-300"
                data-id="37"
                data-v0-t="card"
              >
                <div className="flex flex-col space-y-1.5 p-6" data-id="38">
                  <div
                    className="w-16 h-16 mx-auto mb-4 bg-blue-100  rounded-full flex items-center justify-center"
                    data-id="39"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="lucide lucide-eye h-8 w-8 text-blue-600 "
                      aria-hidden="true"
                      data-id="40"
                    >
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  </div>
                  <h3
                    className="tracking-tight text-xl font-semibold text-center text-gray-900 "
                    data-id="41"
                  >
                    プライバシー保護
                  </h3>
                </div>
                <div className="p-6 pt-0" data-id="42">
                  <p className="text-center text-gray-600 " data-id="43">
                    ZK証明方式による匿名性の確保
                  </p>
                </div>
              </div>
              <div
                className="rounded-lg border text-card-foreground bg-gray-50  border-none shadow-lg hover:shadow-xl transition-shadow duration-300"
                data-id="37"
                data-v0-t="card"
              >
                <div className="flex flex-col space-y-1.5 p-6" data-id="38">
                  <div
                    className="w-16 h-16 mx-auto mb-4 bg-blue-100  rounded-full flex items-center justify-center"
                    data-id="39"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="lucide lucide-sliders-vertical h-8 w-8 text-blue-600 "
                      aria-hidden="true"
                      data-id="40"
                    >
                      <line x1="4" x2="4" y1="21" y2="14"></line>
                      <line x1="4" x2="4" y1="10" y2="3"></line>
                      <line x1="12" x2="12" y1="21" y2="12"></line>
                      <line x1="12" x2="12" y1="8" y2="3"></line>
                      <line x1="20" x2="20" y1="21" y2="16"></line>
                      <line x1="20" x2="20" y1="12" y2="3"></line>
                      <line x1="2" x2="6" y1="14" y2="14"></line>
                      <line x1="10" x2="14" y1="8" y2="8"></line>
                      <line x1="18" x2="22" y1="16" y2="16"></line>
                    </svg>
                  </div>
                  <h3
                    className="tracking-tight text-xl font-semibold text-center text-gray-900 "
                    data-id="41"
                  >
                    柔軟な設定
                  </h3>
                </div>
                <div className="p-6 pt-0" data-id="42">
                  <p className="text-center text-gray-600" data-id="43">
                    カスタマイズ可能なロック期間
                  </p>
                </div>
              </div>
              <div
                className="rounded-lg border text-card-foreground bg-gray-50  border-none shadow-lg hover:shadow-xl transition-shadow duration-300"
                data-id="37"
                data-v0-t="card"
              >
                <div className="flex flex-col space-y-1.5 p-6" data-id="38">
                  <div
                    className="w-16 h-16 mx-auto mb-4 bg-blue-100  rounded-full flex items-center justify-center"
                    data-id="39"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="lucide lucide-layers h-8 w-8 text-blue-600 "
                      aria-hidden="true"
                      data-id="40"
                    >
                      <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"></path>
                      <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"></path>
                      <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"></path>
                    </svg>
                  </div>
                  <h3
                    className="tracking-tight text-xl font-semibold text-center text-gray-900 "
                    data-id="41"
                  >
                    幅広い資産対応
                  </h3>
                </div>
                <div className="p-6 pt-0" data-id="42">
                  <p className="text-center text-gray-600 " data-id="43">
                    複数の暗号資産を一括管理
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="how-to-use" className="py-20 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900">
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
                    <div className="absolute left-0 top-0 bg-blue-600  rounded-full w-16 h-16 flex items-center justify-center">
                      <step.icon
                        className="h-8 w-8 text-white"
                        aria-hidden="true"
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 ">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 ">{step.description}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section id="cautions" className="py-20 bg-white ">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 ">
              注意事項
            </h2>

            <div>
              <CardContent className="pt-6 rounded-lg border text-card-foreground bg-gray-50 border-none shadow-lg">
                <Accordion className="transition-all bg-gray-50">
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    <div className="flex items-center space-x-2">
                      <AlertCircle
                        className="h-5 w-5 text-red-500"
                        aria-hidden="true"
                      />
                      <span className="text-gray-900 font-semibold hover:underline  ">
                        不正な相続申請への対応
                      </span>
                    </div>
                  </AccordionSummary>
                  <AccordionDetails className="text-gray-700 ">
                    不正な相続申請が行われた場合、ロック期間中に必ず取り消してください。ロック期間中は資産所有者が取り消し操作を行うことができます。
                  </AccordionDetails>
                </Accordion>
                <Accordion className="transition-all bg-gray-50">
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                  >
                    <div className="flex items-center space-x-2">
                      <AlertCircle
                        className="h-5 w-5 text-red-500"
                        aria-hidden="true"
                      />
                      <span className="text-gray-900 font-semibold hover:underline  ">
                        秘密情報の取り扱い
                      </span>
                    </div>
                  </AccordionSummary>
                  <AccordionDetails className="text-gray-700 ">
                    ZK証明方式で用いる秘密情報は、あなたと相続人の間で共有する特別な情報です。絶対に第三者に漏らさないようにご注意ください。
                  </AccordionDetails>
                </Accordion>
              </CardContent>
            </div>

            {/* <Card className="bg-gray-50 dark:bg-gray-800 border-none shadow-lg">
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
                      ZK署名方式で用いる秘密情報は、あなたと相続人の間で共有する特別な情報です。絶対に第三者に漏らさないようにご注意ください。
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card> */}
          </div>
        </section>

        <section className="py-20 bg-gray-100 ">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900  mb-6">
              かけがえのない資産を、確実に未来へつなぐ
            </h2>
            <p className="text-xl text-gray-600  mb-8 max-w-3xl mx-auto">
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
