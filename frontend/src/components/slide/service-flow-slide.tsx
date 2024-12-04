"use client";

import { Card } from "@/components/ui/card";

const ServiceFlowSlide = () => (
  <div className="w-full max-w-4xl mx-auto p-6 mb-20 space-y-8 animate-fadeIn">
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
);

export default ServiceFlowSlide;
