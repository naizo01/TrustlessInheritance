"use client";

import { Card } from "@/components/ui/card";

const VideoSlide: React.FC = () => (
  <div className="w-full max-w-4xl mx-auto p-3 mb-20 space-y-4 animate-fadeIn">
    <h2 className="text-3xl font-bold text-center mb-6">デモ</h2>
    <Card className="border-none overflow-hidden flex justify-center items-center">
      <div className="relative" style={{ paddingBottom: '56.25%', height: 0, width: '800px', maxWidth: '100%' }}>
        <iframe
          src="https://www.youtube.com/embed/YMwUYLcO_AI?si=CJ9Y9JE19h5t5xRV&amp;controls=0"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full"
        ></iframe>
      </div>
    </Card>
  </div>
);

export default VideoSlide;