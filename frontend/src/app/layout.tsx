import "@/app/_styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { headers } from "next/headers";
import { type ReactNode } from "react";
import { cookieToInitialState } from "wagmi";

import { getConfig } from "../wagmi";
import { Providers } from "./providers";

import Header from "@/app/_components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s / 暗号資産相続アプリ",
    default: "暗号資産相続アプリ",
  },
  description:
    "相続アプリは、ZK証明を用いた、ブロックチェーン上のトークン相続サービスです。",
};

export default function RootLayout(props: { children: ReactNode }) {
  const initialState = cookieToInitialState(
    getConfig(),
    headers().get("cookie")
  );
  return (
    <html lang="ja">
      <body
        className={`${inter.className} antialiased bg-primary-50 text-primary-700 min-h-screen flex flex-col`}
      >
        <Header />
        <Providers initialState={initialState}>{props.children}</Providers>
      </body>
    </html>
  );
}
