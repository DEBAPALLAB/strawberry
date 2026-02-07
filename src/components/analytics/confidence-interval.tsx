"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Info } from "lucide-react"

interface ConfidenceIntervalProps {
    confidenceInterval: {
        mean: number
        lower_bound: number
        upper_bound: number
        confidence: number
        p_value: number
    }
}

export function ConfidenceIntervalCard({ confidenceInterval }: ConfidenceIntervalProps) {
    const { mean, lower_bound, upper_bound, confidence, p_value } = confidenceInterval
    const isSignificant = p_value < 0.05

    return (
        <Card className="border-2 shadow-lg">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-700">CONFIDENCE INTERVAL (CI)</h3>
                    <Info className="h-4 w-4 text-muted-foreground" />
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="text-center">
                        <div className="text-4xl font-bold text-gray-900">
                            {(confidence * 100).toFixed(0)}%
                        </div>
                        <p className={`text-sm font-medium mt-1 ${isSignificant ? 'text-green-600' : 'text-orange-600'}`}>
                            p {isSignificant ? '<' : '>'} 0.05
                        </p>
                    </div>

                    {/* Visual slider */}
                    <div className="relative pt-4 pb-2">
                        <div className="h-2 w-full bg-gray-200 rounded-full relative">
                            {/* CI Range */}
                            <div
                                className="absolute h-2 bg-blue-300 rounded-full"
                                style={{
                                    left: `${lower_bound * 100}%`,
                                    width: `${(upper_bound - lower_bound) * 100}%`
                                }}
                            />
                            {/* Mean marker */}
                            <div
                                className="absolute w-1 h-6 bg-blue-600 rounded transform -translate-y-2"
                                style={{ left: `${mean * 100}%` }}
                            />
                        </div>

                        {/* Labels */}
                        <div className="flex justify-between text-xs text-muted-foreground mt-2">
                            <span>Lower Bound<br />{lower_bound.toFixed(2)}</span>
                            <span className="text-center font-semibold text-blue-600">Mean<br />{mean.toFixed(2)}</span>
                            <span className="text-right">Upper Bound<br />{upper_bound.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
