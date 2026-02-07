"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { BarChart3, Grid3X3, Waves } from "lucide-react"

interface StatisticalBreakdownProps {
    polarizationIndex: number
    clusterAnalysis: {
        n_clusters: number
        clusters: Array<{
            cluster_id: number
            size: number
            mean_probability: number
            variance: number
        }>
        strength: number
    }
}

export function StatisticalBreakdown({ polarizationIndex, clusterAnalysis }: StatisticalBreakdownProps) {
    const polarizationLevel = polarizationIndex < 0.3 ? "Low" : polarizationIndex < 0.6 ? "Moderate" : "High"
    const polarizationColor = polarizationIndex < 0.3 ? "text-green-600" : polarizationIndex < 0.6 ? "text-yellow-600" : "text-red-600"

    return (
        <div className="col-span-full">
            <div className="flex items-center gap-3 mb-4">
                <BarChart3 className="h-5 w-5 text-blue-600" />
                <h2 className="text-xl font-bold">Statistical Breakdown</h2>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                {/* Opinion Variance */}
                <Card className="border-2 shadow-lg">
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Waves className="h-4 w-4 text-blue-600" />
                            <h3 className="text-sm font-semibold text-gray-700">Opinion Variance</h3>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">σ = {polarizationIndex.toFixed(2)}</p>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {/* Simple bell curve visualization */}
                            <div className="h-24 flex items-end justify-center gap-1">
                                {[0.1, 0.3, 0.6, 0.9, 1, 0.9, 0.6, 0.3, 0.1].map((height, i) => (
                                    <div
                                        key={i}
                                        className="w-8 bg-blue-200 rounded-t"
                                        style={{ height: `${height * 100}%` }}
                                    />
                                ))}
                            </div>
                            <p className="text-xs text-center text-muted-foreground">
                                Variance distribution indicates high stability around the core consensus narrative with minimal outliers.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Cluster Strength */}
                <Card className="border-2 shadow-lg">
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Grid3X3 className="h-4 w-4 text-purple-600" />
                            <h3 className="text-sm font-semibold text-gray-700">Cluster Strength</h3>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">k = {clusterAnalysis.n_clusters}</p>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {/* Heatmap-style grid */}
                            <div className="grid grid-cols-4 gap-1">
                                {clusterAnalysis.clusters.map((cluster, i) => {
                                    const intensity = cluster.mean_probability
                                    return (
                                        <div
                                            key={i}
                                            className="aspect-square rounded flex items-center justify-center text-xs font-semibold text-white"
                                            style={{
                                                backgroundColor: `rgba(59, 130, 246, ${intensity})`
                                            }}
                                        >
                                            {cluster.size}
                                        </div>
                                    )
                                })}
                            </div>
                            <p className="text-xs text-center text-muted-foreground">
                                Heatmap density reveals strong cohesion in the primary cluster, with peripheral groups fading significantly.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Polarization Index */}
                <Card className="border-2 shadow-lg">
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <BarChart3 className="h-4 w-4 text-orange-600" />
                            <h3 className="text-sm font-semibold text-gray-700">Polarization Index</h3>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                            {polarizationLevel} ({polarizationIndex.toFixed(2)})
                        </p>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {/* Slider visualization */}
                            <div className="relative h-24 flex items-center">
                                <div className="w-full h-3 bg-gradient-to-r from-green-200 via-yellow-200 to-red-200 rounded-full relative">
                                    <div
                                        className="absolute w-6 h-6 bg-gray-800 rounded-full transform -translate-x-1/2 -translate-y-1.5 shadow-lg"
                                        style={{ left: `${polarizationIndex * 100}%` }}
                                    />
                                </div>
                            </div>
                            <div className="flex justify-between text-xs text-muted-foreground">
                                <span>COHESIVE</span>
                                <span>NEUTRAL</span>
                                <span>POLARIZED</span>
                            </div>
                            <p className="text-xs text-center text-muted-foreground">
                                Index suggests low risk of ideological schism within the simulated population segments.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
