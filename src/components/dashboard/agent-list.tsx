"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Users, TrendingUp } from "lucide-react"

export function AgentList({ agents }: { agents: any[] }) {
    if (!agents) return null

    return (
        <div className="grid gap-6">
            <Card className="border-2 shadow-xl bg-white/80 backdrop-blur-sm">
                <CardHeader className="border-b bg-gradient-to-r from-blue-50 to-purple-50">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600">
                            <Users className="h-5 w-5 text-white" />
                        </div>
                        <div>
                            <CardTitle className="text-2xl">Agent Inspector</CardTitle>
                            <p className="text-sm text-muted-foreground mt-1">Detailed view of individual agent traits (showing {agents.length} agents)</p>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <ScrollArea className="h-[600px]">
                        <div className="overflow-x-auto">
                            <table className="w-full caption-bottom text-sm">
                                <thead className="bg-slate-50 sticky top-0 z-10">
                                    <tr className="border-b-2 border-slate-200">
                                        <th className="h-14 px-6 text-left align-middle font-semibold text-gray-900 w-[80px]">ID</th>
                                        <th className="h-14 px-6 text-left align-middle font-semibold text-gray-900">
                                            <div className="flex items-center gap-2">
                                                <TrendingUp className="h-4 w-4 text-blue-600" />
                                                Adoption
                                            </div>
                                        </th>
                                        <th className="h-14 px-6 text-left align-middle font-semibold text-gray-900">Risk Tolerance</th>
                                        <th className="h-14 px-6 text-left align-middle font-semibold text-gray-900">Openness</th>
                                        <th className="h-14 px-6 text-left align-middle font-semibold text-gray-900">Conformity</th>
                                        <th className="h-14 px-6 text-left align-middle font-semibold text-gray-900">Security Pref.</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {agents.map((agent, idx) => (
                                        <tr
                                            key={agent.agent_id}
                                            className={`border-b transition-colors hover:bg-blue-50/50 ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/30'
                                                }`}
                                        >
                                            <td className="p-6 align-middle">
                                                <div className="font-mono text-xs font-semibold text-gray-600">
                                                    #{agent.agent_id.toString().padStart(3, '0')}
                                                </div>
                                            </td>
                                            <td className="p-6 align-middle">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex-1 max-w-[120px]">
                                                        <div className="h-2 w-full rounded-full bg-gradient-to-r from-slate-200 to-slate-100 overflow-hidden">
                                                            <div
                                                                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all"
                                                                style={{ width: `${agent.adoption_probability * 100}%` }}
                                                            />
                                                        </div>
                                                    </div>
                                                    <span className="font-semibold text-sm min-w-[45px]">
                                                        {(agent.adoption_probability * 100).toFixed(0)}%
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="p-6 align-middle">
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${agent.risk_tolerance > 0
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-red-100 text-red-800'
                                                    }`}>
                                                    {agent.risk_tolerance.toFixed(2)}
                                                </span>
                                            </td>
                                            <td className="p-6 align-middle">
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${agent.openness_to_change > 0
                                                        ? 'bg-blue-100 text-blue-800'
                                                        : 'bg-gray-100 text-gray-800'
                                                    }`}>
                                                    {agent.openness_to_change.toFixed(2)}
                                                </span>
                                            </td>
                                            <td className="p-6 align-middle">
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${agent.conformity > 0
                                                        ? 'bg-purple-100 text-purple-800'
                                                        : 'bg-gray-100 text-gray-800'
                                                    }`}>
                                                    {agent.conformity.toFixed(2)}
                                                </span>
                                            </td>
                                            <td className="p-6 align-middle">
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${agent.security_preference > 0
                                                        ? 'bg-orange-100 text-orange-800'
                                                        : 'bg-gray-100 text-gray-800'
                                                    }`}>
                                                    {agent.security_preference.toFixed(2)}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </ScrollArea>
                </CardContent>
            </Card>
        </div>
    )
}
