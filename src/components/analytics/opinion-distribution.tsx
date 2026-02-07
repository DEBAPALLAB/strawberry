"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"

interface OpinionDistributionProps {
    distribution: {
        agree: number
        neutral: number
        disagree: number
    }
    sampleSize: number
}

export function OpinionDistribution({ distribution, sampleSize }: OpinionDistributionProps) {
    return (
        <Card className="border-2 shadow-lg">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-700">OPINION DISTRIBUTION</h3>
                    <span className="text-xs text-muted-foreground">N = {sampleSize.toLocaleString()}</span>
                </div>
            </CardHeader>
            <CardContent className="space-y-3">
                {/* Agree */}
                <div>
                    <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Agree</span>
                        <span className="text-sm font-semibold text-blue-600">{(distribution.agree * 100).toFixed(0)}%</span>
                    </div>
                    <div className="h-8 w-full bg-gray-100 rounded overflow-hidden">
                        <div
                            className="h-full bg-blue-500 transition-all duration-500"
                            style={{ width: `${distribution.agree * 100}%` }}
                        />
                    </div>
                </div>

                {/* Neutral */}
                <div>
                    <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Neutral</span>
                        <span className="text-sm font-semibold text-gray-600">{(distribution.neutral * 100).toFixed(0)}%</span>
                    </div>
                    <div className="h-8 w-full bg-gray-100 rounded overflow-hidden">
                        <div
                            className="h-full bg-gray-400 transition-all duration-500"
                            style={{ width: `${distribution.neutral * 100}%` }}
                        />
                    </div>
                </div>

                {/* Disagree */}
                <div>
                    <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Disagree</span>
                        <span className="text-sm font-semibold text-gray-800">{(distribution.disagree * 100).toFixed(0)}%</span>
                    </div>
                    <div className="h-8 w-full bg-gray-100 rounded overflow-hidden">
                        <div
                            className="h-full bg-gray-700 transition-all duration-500"
                            style={{ width: `${distribution.disagree * 100}%` }}
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
