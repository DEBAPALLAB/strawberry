import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sparkles, TrendingUp, Users } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen relative">
      {/* Gradient Background */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:64px_64px]"></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center space-y-12 py-24 text-center md:py-32 lg:py-40">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-1.5 text-sm font-medium text-white shadow-lg">
            <Sparkles className="h-4 w-4" />
            <span>AI-Powered Behavioral Simulation</span>
          </div>

          {/* Hero Text */}
          <div className="space-y-6 max-w-4xl">
            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
              Predict How People Will React
            </h1>
            <p className="mx-auto max-w-[700px] text-lg text-gray-600 md:text-xl lg:text-2xl leading-relaxed">
              Run agent-based simulations on <span className="font-semibold text-blue-600">real population data</span> to forecast adoption rates before you launch.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-6 text-lg" asChild>
              <Link href="/scenario">
                <TrendingUp className="mr-2 h-5 w-5" />
                Run Simulation
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="border-2 hover:bg-slate-50 px-8 py-6 text-lg" asChild>
              <Link href="/baseline">
                <Users className="mr-2 h-5 w-5" />
                View Baseline
              </Link>
            </Button>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap gap-3 justify-center pt-8 max-w-2xl">
            <div className="px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full text-sm font-medium border border-gray-200 shadow-sm">
              🌍 Real WVS Data
            </div>
            <div className="px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full text-sm font-medium border border-gray-200 shadow-sm">
              🧠 LLM-Powered Analysis
            </div>
            <div className="px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full text-sm font-medium border border-gray-200 shadow-sm">
              📊 Interactive Dashboard
            </div>
            <div className="px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full text-sm font-medium border border-gray-200 shadow-sm">
              ⚡ Agent-Based Modeling
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
