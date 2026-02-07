"use client"

import { useEffect, useState } from "react"
import { useSimulationStore } from "@/lib/store"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { ConsensusCard } from "@/components/analytics/consensus-card"
import { OpinionDistribution } from "@/components/analytics/opinion-distribution"
import { ConfidenceIntervalCard } from "@/components/analytics/confidence-interval"
import { StatisticalBreakdown } from "@/components/analytics/statistical-breakdown"
import { DetailedAgentCards } from "@/components/dashboard/detailed-agents"
import { Loader2, AlertCircle, Settings, FileDown, Sparkles } from "lucide-react"

export default function SimulationPage() {
    const { results, isLoading, error } = useSimulationStore()
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        if (isLoading) {
            const timer = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 95) return 95
                    return prev + 5
                })
            }, 500)
            return () => clearInterval(timer)
        } else {
            setProgress(100)
        }
    }, [isLoading])

    if (isLoading) {
        return (
            <div className="min-h-screen relative">
                <div className="absolute inset-0 -z-10 h-full w-full bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:64px_64px]"></div>
                </div>

                <div className="container mx-auto px-4 py-16">
                    <div className="max-w-xl mx-auto">
                        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
                            <div className="flex items-center justify-center">
                                <div className="relative">
                                    <Loader2 className="h-16 w-16 text-blue-600 animate-spin" />
                                    <Sparkles className="h-6 w-6 text-purple-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                                </div>
                            </div>
                            <div className="text-center space-y-2">
                                <h2 className="text-2xl font-bold text-gray-900">Running Population Simulation</h2>
                                <p className="text-sm text-muted-foreground">
                                    Synthesizing decision-grade insights from agent-based modeling
                                </p>
                            </div>
                            <div className="space-y-2">
                                <Progress value={progress} className="h-2" />
                                <p className="text-xs text-center text-muted-foreground">
                                    {progress < 30 && "Generating agent population..."}
                                    {progress >= 30 && progress < 60 && "Computing behavioral responses..."}
                                    {progress >= 60 && progress < 90 && "Analyzing opinion distribution..."}
                                    {progress >= 90 && "Finalizing results..."}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen relative">
                <div className="absolute inset-0 -z-10 h-full w-full bg-gradient-to-br from-slate-50 via-red-50 to-orange-50" />
                <div className="container mx-auto px-4 py-16">
                    <div className="max-w-xl mx-auto">
                        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6 border-2 border-red-200">
                            <div className="flex items-center gap-3 text-red-600">
                                <AlertCircle className="h-8 w-8" />
                                <h2 className="text-2xl font-bold">Simulation Error</h2>
                            </div>
                            <p className="text-gray-700">{error}</p>
                            <Button onClick={() => window.location.href = "/scenario"} className="w-full">
                                Try Again
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (!results) {
        return (
            <div className="min-h-screen relative">
                <div className="absolute inset-0 -z-10 h-full w-full bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50" />
                <div className="container mx-auto px-4 py-16 text-center">
                    <h2 className="text-2xl font-bold text-gray-900">No simulation data</h2>
                    <p className="text-muted-foreground mt-2">Start a new simulation from the scenario page</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen relative">
            {/* Background */}
            <div className="absolute inset-0 -z-10 h-full w-full bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:64px_64px]"></div>
            </div>

            <div className="container mx-auto px-4 py-8 space-y-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                            <span>Diagnostic Results</span>
                            <span>›</span>
                            <span>Phase 3: Analysis</span>
                        </div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Population Stress Test
                        </h1>
                        <p className="text-sm text-muted-foreground mt-2">
                            Understanding adoption readiness and resistance drivers in your target population
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                            <Settings className="h-4 w-4 mr-2" />
                            Config
                        </Button>
                        <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600">
                            <FileDown className="h-4 w-4 mr-2" />
                            Export Report
                        </Button>
                    </div>
                </div>

                {/* Enterprise Analytics  Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {/* Consensus Card - Full width */}
                    <ConsensusCard
                        consensusPercentage={results.consensus_percentage || results.adoption_rate || 0}
                        trend={results.trend}
                        baseline={null}
                    />

                    {/* Opinion Distribution */}
                    <OpinionDistribution
                        distribution={results.opinion_distribution || { agree: 0, neutral: 0, disagree: 0 }}
                        sampleSize={results.sample_size || 0}
                    />

                    {/* Confidence Interval */}
                    <ConfidenceIntervalCard
                        confidenceInterval={results.confidence_interval || {
                            mean: 0,
                            lower_bound: 0,
                            upper_bound: 0,
                            confidence: 0.95,
                            p_value: 1
                        }}
                    />
                </div>

                {/* Statistical Breakdown */}
                <StatisticalBreakdown
                    polarizationIndex={results.polarization_index || 0}
                    clusterAnalysis={results.cluster_analysis || { n_clusters: 4, clusters: [], strength: 0 }}
                />

                {/* Individual Agent Inspection */}
                {results.detailed_agents && results.detailed_agents.length > 0 && (
                    <section className="space-y-4">
                        <div className="border-t pt-6">
                            <h2 className="text-2xl font-bold mb-2">Individual Decision Breakdown</h2>
                            <p className="text-sm text-muted-foreground">
                                Examining individual agent decisions to understand heterogeneity and resistance drivers
                            </p>
                        </div>
                        <DetailedAgentCards agents={results.detailed_agents} />
                    </section>
                )}

                {/* Agent Table - Simplified for now, will enhance later */}
                {results.agent_table && results.agent_table.length > 0 && (
                    <section className="space-y-4">
                        <div className="border-t pt-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-2xl font-bold">Active Agent Sample</h2>
                                <span className="text-sm text-blue-600 font-medium cursor-pointer hover:underline">
                                    View All {results.sample_size?.toLocaleString()}
                                </span>
                            </div>
                            <div className="bg-white rounded-lg border-2 shadow-lg overflow-hidden">
                                <table className="w-full">
                                    <thead className="bg-gray-50 border-b-2">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Agent ID</th>
                                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Role / Segment</th>
                                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Sentiment Score</th>
                                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                        {results.agent_table.slice(0, 20).map((agent: any) => (
                                            <tr key={agent.agent_id} className="hover:bg-blue-50/50 transition-colors">
                                                <td className="px-4 py-3 text-sm font-mono text-blue-600">{agent.agent_id}</td>
                                                <td className="px-4 py-3 text-sm">
                                                    {agent.role} / <span className="text-muted-foreground">{agent.segment}</span>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <span className={`text-sm font-semibold ${agent.sentiment_score > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                        {agent.sentiment_score?.toFixed(2)}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${agent.status === 'Verified' ? 'bg-green-100 text-green-800' :
                                                        agent.status === 'Flagged' ? 'bg-orange-100 text-orange-800' :
                                                            'bg-gray-100 text-gray-800'
                                                        }`}>
                                                        {agent.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>
                )}
            </div>
        </div>
    )
}
