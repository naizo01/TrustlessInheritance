"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import ProjectProgressSlide from "@/components/slide/project-progress-slide"
import WhyBlockchainSlide from "@/components/slide/why-blockchain-slide"
import ComparisonSlide from "@/components/slide/comparison-slide"
import TechnicalFeaturesSlide from "@/components/slide/technical-features-slide"
import ContractDesignSlide from "@/components/slide/contract-design-slide"
import SolutionSlide from "@/components/slide/solution-slide"
import TitleSlide from "@/components/slide/title-slide"
import BackgroundSlide from "@/components/slide/background-slide"
import CurrentMethodsSlide from "@/components/slide/current-methods-slide"
import ServiceFlowSlide from "@/components/slide/service-flow-slide"
import { ChevronLeft, ChevronRight } from 'lucide-react'


export function Presentation() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    <TitleSlide key="title" />,
    <BackgroundSlide key="background" />,
    <CurrentMethodsSlide key="current" />,
    <SolutionSlide key="solution" />,
    <ServiceFlowSlide key="service-flow" />,
    <WhyBlockchainSlide key="why-blockchain" />,
    <ComparisonSlide key="comparison" />,
    <TechnicalFeaturesSlide key="technical" />,
    <ContractDesignSlide key="contract-design" />,
    <ProjectProgressSlide key="progress" />
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-[900px] mx-auto">
        {slides[currentSlide]}

        <div className="mt-4 fixed bottom-8 right-8 flex space-x-4">
          <Button
            onClick={() => setCurrentSlide(prev => Math.max(0, prev - 1))}
            disabled={currentSlide === 0}
            variant="outline"
            className="hover:scale-105 transition-transform duration-300"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            前へ
          </Button>
          <Button
            onClick={() => setCurrentSlide(prev => Math.min(slides.length - 1, prev + 1))}
            disabled={currentSlide === slides.length - 1}
            className="hover:scale-105 transition-transform duration-300"
          >
            次へ
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        <div className="fixed bottom-8 left-8">
          <Card className="px-4 py-2 border-none">
            {currentSlide + 1} / {slides.length}
          </Card>
        </div>
      </div>
    </div>
  )
}