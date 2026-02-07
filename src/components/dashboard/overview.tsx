"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"
import { TrendingUp, Users, BarChart3 } from "lucide-react"

export function PopulationOverview({ results }: { results: any }) {
    if (!results) return null

    const adoptionRate = results.adoption_rate || 0
    const meanAdoption = results.mean_adoption || 0
    const distribution = results.distribution || []

    const totalAgents = distribution.length > 0 ? distribution.reduce((sum: number, d: any) => sum + d.count, 0) : 0

    return (
        <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid gap-6 md:grid-cols-3">
                <Card className="border-2 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100/50 border-blue-200">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-blue-900">Mean Probability</CardTitle>
                        <TrendingUp className="h-5 w-5 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-blue-900">{(results.mean_adoption * 100).toFixed(1)}%</div>
                        <p className="text-xs text-blue-700 mt-1">Average across all agents</p>
                    </CardContent>
                </Card>
                <Card className="border-2 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100/50 border-purple-200">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-purple-900">Projected Adoption Rate</CardTitle>
                        <Users className="h-5 w-5 text-purple-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{(adoptionRate * 100).toFixed(1)}%</div>
                        <p className="text-xs text-muted-foreground">Agents with &gt;50% probability</p>
                    </CardContent>
                </Card>
                <Card className="border-2 shadow-lg bg-gradient-to-br from-green-50 to-green-100/50 border-green-200">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-green-900">Sample Size</CardTitle>
                        <BarChart3 className="h-5 w-5 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-green-900">{totalAgents}</div>
                        <p className="text-xs text-green-700 mt-1">Total agents simulated</p>
                    </CardContent>
                </Card>
            </div>

            {/* Chart */}
            <Card className="border-2 shadow-xl bg-white/80 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="text-xl">Adoption Probability Distribution</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={results.distribution}>
                            <XAxis
                                dataKey="bin"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                            />
                            <YAxis
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                            />
                            <Tooltip
                                cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
                                contentStyle={{
                                    backgroundColor: 'white',
                                    border: '2px solid #e5e7eb',
                                    borderRadius: '8px',
                                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'
                                }}
                            />
                            <Bar
                                dataKey="count"
                                fill="url(#colorGradient)"
                                radius={[8, 8, 0, 0]}
                            />
                            <defs>
                                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.9} />
                                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.9} />
                                </linearGradient>
                            </defs>
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    )
}
