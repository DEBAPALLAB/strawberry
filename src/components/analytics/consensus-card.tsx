"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

interface ConsensusCardProps {
    consensusPercentage: number
    trend: "up" | "down" | "stable" | null
    baseline: number | null
}

export function ConsensusCard({ consensusPercentage, trend, baseline }: ConsensusCardProps) {
    const getTrendIcon = () => {
        if (!trend) return null
        if (trend === "up") return <TrendingUp className="h-5 w-5 text-blue-600" />
        if (trend === "down") return <TrendingDown className="h-5 w-5 text-blue-600" />
        return <Minus className="h-5 w-5 text-gray-500" />
    }

    const getTrendText = () => {
        if (!trend || !baseline) return null
        const diff = consensusPercentage - baseline
        const direction = diff > 0 ? "higher" : "lower"
        return `${Math.abs(diff).toFixed(1)}% ${direction} than baseline`
    }

    return (
        <Card className="border-2 bg-gradient-to-br from-blue-50 to-purple-50">
            <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">
                    Adoption Readiness
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold text-blue-600">
                        {consensusPercentage.toFixed(1)}%
                    </span>
                    {getTrendIcon()}
                </div>

                {trend && baseline !== null && (
                    <p className="text-sm text-muted-foreground">
                        {getTrendText()}
                    </p>
                )}

                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
                        style={{ width: `${consensusPercentage}%` }}
                    />
                </div>
            </CardContent>
        </Card>
    )
}
