"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Users, Brain, MessageSquare, TrendingUp, MapPin, Briefcase } from "lucide-react"

interface DetailedAgent {
    agent_id: number
    adoption_probability: number
    thought_process: string
    initial_opinion: string
    age?: number
    risk_tolerance: number
    openness_to_change: number
    conformity: number
    security_preference: number
    components?: any
}

export function DetailedAgentCards({ agents }: { agents: DetailedAgent[] }) {
    if (!agents || agents.length === 0) return null

    const getOpinionColor = (opinion: string) => {
        if (opinion.includes("Strongly supportive")) return "bg-green-100 text-green-800 border-green-200"
        if (opinion.includes("optimistic")) return "bg-blue-100 text-blue-800 border-blue-200"
        if (opinion.includes("Skeptical")) return "bg-yellow-100 text-yellow-800 border-yellow-200"
        return "bg-red-100 text-red-800 border-red-200"
    }

    const getProbabilityColor = (prob: number) => {
        if (prob > 0.7) return "text-green-600"
        if (prob > 0.5) return "text-blue-600"
        if (prob > 0.3) return "text-yellow-600"
        return "text-red-600"
    }

    const getDemographic = (agent: DetailedAgent) => {
        const age = agent.age || 35
        const location = agent.risk_tolerance > 0 ? "Urban" : agent.conformity > 0.5 ? "Suburban" : "Rural"
        const profession = agent.openness_to_change > 0 ? "Tech/Creative" :
            agent.security_preference > 0.5 ? "Finance/Healthcare" :
                "Traditional Sector"

        return { age, location, profession }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600">
                    <Users className="h-5 w-5 text-white" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold">Detailed Agent Analysis</h2>
                    <p className="text-sm text-muted-foreground">AI-generated insights for the most interesting agents ({agents.length} total)</p>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
                {agents.map((agent) => {
                    const demo = getDemographic(agent)

                    return (
                        <Card
                            key={agent.agent_id}
                            className="border-2 shadow-lg hover:shadow-xl transition-shadow bg-white/80 backdrop-blur-sm"
                        >
                            <CardHeader className="border-b bg-gradient-to-r from-slate-50 to-blue-50 pb-4">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-12 h-12 rounded-full ${getProbabilityColor(agent.adoption_probability)} bg-opacity-10 flex items-center justify-center font-bold text-lg`}>
                                            #{agent.agent_id}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className="font-semibold text-gray-700">Agent #{agent.agent_id}</span>
                                                <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                                                    Age {demo.age}
                                                </span>
                                            </div>
                                            <div className="flex gap-2 mt-1 text-xs text-muted-foreground">
                                                <span className="flex items-center gap-1">
                                                    <MapPin className="h-3 w-3" />
                                                    {demo.location}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Briefcase className="h-3 w-3" />
                                                    {demo.profession}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className={`text-3xl font-bold ${getProbabilityColor(agent.adoption_probability)}`}>
                                            {(agent.adoption_probability * 100).toFixed(0)}%
                                        </div>
                                        <div className="text-xs text-muted-foreground">Adoption</div>
                                    </div>
                                </div>
                            </CardHeader>

                            <CardContent className="pt-4 space-y-4">
                                {/* Initial Opinion */}
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                        <MessageSquare className="h-4 w-4 text-purple-600" />
                                        INITIAL OPINION
                                    </div>
                                    <div className={`inline-block px-3 py-1.5 rounded-lg border-2 text-sm font-medium ${getOpinionColor(agent.initial_opinion)}`}>
                                        {agent.initial_opinion}
                                    </div>
                                </div>

                                {/* Thought Process */}
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                        <Brain className="h-4 w-4 text-blue-600" />
                                        THOUGHT PROCESS
                                    </div>
                                    <p className="text-sm text-gray-600 leading-relaxed italic bg-blue-50/50 p-3 rounded-lg border border-blue-100">
                                        "{agent.thought_process}"
                                    </p>
                                </div>

                                {/* Trait Breakdown */}
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                        <TrendingUp className="h-4 w-4 text-green-600" />
                                        KEY TRAITS
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 text-xs">
                                        <div className="flex justify-between p-2 bg-gray-50 rounded">
                                            <span className="text-muted-foreground">Risk Tolerance</span>
                                            <span className="font-semibold">{agent.risk_tolerance.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between p-2 bg-gray-50 rounded">
                                            <span className="text-muted-foreground">Openness</span>
                                            <span className="font-semibold">{agent.openness_to_change.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between p-2 bg-gray-50 rounded">
                                            <span className="text-muted-foreground">Conformity</span>
                                            <span className="font-semibold">{agent.conformity.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between p-2 bg-gray-50 rounded">
                                            <span className="text-muted-foreground">Security Pref.</span>
                                            <span className="font-semibold">{agent.security_preference.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>
        </div>
    )
}
