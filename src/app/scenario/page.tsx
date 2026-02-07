"use client"

import { useSimulationStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ArrowRight, Sparkles } from "lucide-react"

export default function ScenarioPage() {
    const { scenarioText, setScenarioText } = useSimulationStore()

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
            <div className="container mx-auto max-w-4xl px-4 py-12">
                <div className="space-y-8">
                    {/* Header */}
                    <div className="text-center space-y-3">
                        <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-1.5 text-sm font-medium text-white shadow-lg mb-4">
                            <Sparkles className="h-4 w-4" />
                            Phase 1: Intent & Framing
                        </div>
                        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent">Describe Your Scenario</h1>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                            Test how a real population would respond to your idea, policy, or change.
                            <span className="block mt-1 text-sm">Resistance is expected—this tool makes it legible.</span>
                        </p>
                    </div>

                    {/* Scenario Card */}
                    <Card className="border-2 shadow-xl bg-white/80 backdrop-blur-sm">
                        <CardHeader className="space-y-2">
                            <CardTitle className="text-2xl">What do you want to test?</CardTitle>
                            <CardDescription className="text-base">
                                Describe the scenario you want to stress-test against a real population.
                                The system will model individual decisions based on real behavioral data.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Textarea
                                placeholder="Example: A city introduces a congestion charge of $15 for vehicles entering downtown during peak hours. Revenue funds public transit expansion."
                                className="min-h-[200px] resize-none text-base border-2 focus:border-blue-500 transition-colors"
                                value={scenarioText}
                                onChange={(e) => setScenarioText(e.target.value)}
                            />
                            <p className="text-xs text-muted-foreground mt-3">
                                💡 Be specific about context, trade-offs, and constraints. Avoid framing as inherently good or bad.
                            </p>
                        </CardContent>
                    </Card>

                    {/* Continue Button */}
                    <div className="flex justify-end pt-4">
                        <Button
                            size="lg"
                            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-8"
                            asChild
                            disabled={!scenarioText.trim()}
                        >
                            <Link href="/population">
                                Continue to Context
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

