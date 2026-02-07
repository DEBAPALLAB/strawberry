"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ConsensusCard } from "@/components/analytics/consensus-card"
import { OpinionDistribution } from "@/components/analytics/opinion-distribution"
import { ConfidenceIntervalCard } from "@/components/analytics/confidence-interval"
import { StatisticalBreakdown } from "@/components/analytics/statistical-breakdown"
import { Loader2, ArrowRight, BarChart3 } from "lucide-react"

export default function BaselinePage() {
    const router = useRouter()
    const [baselineData, setBaselineData] = useState<any>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        fetchBaseline()
    }, [])

    const fetchBaseline = async () => {
        setIsLoading(true)
        setError(null)

        try {
            const response = await fetch('http://localhost:8000/baseline-simulation?country_code=356&num_agents=30')

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const data = await response.json()
            setBaselineData(data)
        } catch (err: any) {
            setError(err.message || 'Failed to load baseline simulation')
        } finally {
            setIsLoading(false)
        }
    }

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
                                <Loader2 className="h-16 w-16 text-blue-600 animate-spin" />
                            </div>
                            <div className="text-center space-y-2">
                                <h2 className="text-2xl font-bold text-gray-900">Generating Baseline</h2>
                                <p className="text-sm text-muted-foreground">
                                    Analyzing current population state with 30 agents...
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
                            <h2 className="text-2xl font-bold text-red-600">Error Loading Baseline</h2>
                            <p className="text-gray-700">{error}</p>
                            <Button onClick={fetchBaseline} className="w-full">
                                Retry
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (!baselineData) return null

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
                        <div className="flex items-center gap-2 mb-2">
                            <BarChart3 className="h-6 w-6 text-blue-600" />
                            <span className="text-sm font-medium text-muted-foreground">BASELINE ANALYSIS</span>
                        </div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Current Population State
                        </h1>
                        <p className="text-sm text-muted-foreground mt-2">
                            Baseline statistics from {baselineData.sample_size} agents with neutral parameters. Use this as a reference point to compare scenario impacts.
                        </p>
                    </div>
                    <Button
                        size="lg"
                        className="bg-gradient-to-r from-blue-600 to-purple-600"
                        onClick={() => router.push('/scenario')}
                    >
                        Test a Scenario
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                </div>

                {/* Analytics Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {/* Consensus Card - Full width */}
                    <ConsensusCard
                        consensusPercentage={baselineData.consensus_percentage || 0}
                        trend={null}
                        baseline={null}
                    />

                    {/* Opinion Distribution */}
                    <OpinionDistribution
                        distribution={baselineData.opinion_distribution || { agree: 0, neutral: 0, disagree: 0 }}
                        sampleSize={baselineData.sample_size || 0}
                    />

                    {/* Confidence Interval */}
                    <ConfidenceIntervalCard
                        confidenceInterval={baselineData.confidence_interval || {
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
                    polarizationIndex={baselineData.polarization_index || 0}
                    clusterAnalysis={baselineData.cluster_analysis || { n_clusters: 4, clusters: [], strength: 0 }}
                />

                {/* Agent Table */}
                {baselineData.agent_table && baselineData.agent_table.length > 0 && (
                    <section className="space-y-4">
                        <div className="border-t pt-6">
                            <h2 className="text-2xl font-bold mb-4">Agent Sample (Baseline)</h2>
                            <div className="bg-white rounded-lg border-2 shadow-lg overflow-hidden">
                                <table className="w-full">
                                    <thead className="bg-gray-50 border-b-2">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Agent ID</th>
                                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Role / Segment</th>
                                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Sentiment</th>
                                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Probability</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                        {baselineData.agent_table.map((agent: any) => (
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
                                                <td className="px-4 py-3 text-sm">
                                                    {(agent.adoption_probability * 100).toFixed(1)}%
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>
                )}

                {/* CTA */}
                <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50">
                    <CardHeader>
                        <h3 className="text-xl font-bold">Ready to Test a Scenario?</h3>
                        <p className="text-sm text-muted-foreground">
                            Enter a policy or product scenario to see how these baseline statistics change based on your population's traits and preferences.
                        </p>
                    </CardHeader>
                    <CardContent>
                        <Button
                            size="lg"
                            className="bg-gradient-to-r from-blue-600 to-purple-600"
                            onClick={() => router.push('/scenario')}
                        >
                            Start Scenario Analysis
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
