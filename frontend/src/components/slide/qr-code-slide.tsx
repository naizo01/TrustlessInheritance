"use client";

import { Card } from "@/components/ui/card";
import Image from 'next/image';
import { Button } from "@/components/ui/button";

const QRCodeSlide: React.FC = () => {
  const appUrl = "https://trustless-inheritance.vercel.app/";

  return (
    <div className="w-full max-w-4xl mx-auto p-3 mb-20 flex flex-col items-center justify-center space-y-4 animate-fadeIn">
      <h2 className="text-3xl font-bold text-center mb-6">アプリケーションリンク</h2>
      <Image
        src="/qr.png" // QRコード画像のパス
        alt="QR Code"
        width={400}
        height={400}
        className="object-contain"
      />
      <p className="text-center text-gray-600 dark:text-gray-300 mt-4">
        {appUrl}
      </p>
      <Button
        size="lg"
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
        onClick={() => window.location.href = appUrl}
      >
        four nextへ
      </Button>
    </div>
  );
};

export default QRCodeSlide;