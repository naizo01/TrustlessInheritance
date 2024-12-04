"use client";

import { Card } from "@/components/ui/card";

interface ServiceFlowSlideProps {
  imagePath: string;
}

const ServiceFlowSlide: React.FC<ServiceFlowSlideProps> = ({ imagePath }) => (
  <div className="w-full max-w-4xl mx-auto p-3 mb-20 space-y-4 animate-fadeIn">
    <h2 className="text-3xl font-bold text-center mb-6">サービスフロー</h2>
    <Card className="border-none overflow-hidden">
      <img
        src={imagePath}
        alt="サービスフロー"
        className="w-full h-auto object-contain"
      />
    </Card>
  </div>
);

export default ServiceFlowSlide;