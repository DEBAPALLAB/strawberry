"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSimulationStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { ArrowRight, Users, Globe } from "lucide-react"

export default function PopulationPage() {
    const router = useRouter()
    const { populationConfig, setPopulationConfig, runSimulation } = useSimulationStore()
    const [isRunning, setIsRunning] = useState(false)

    const handleRunSimulation = async () => {
        setIsRunning(true)
        try {
            await runSimulation()
            // Navigate to simulation page after successful completion
            router.push('/simulation')
        } catch (error) {
            console.error('Simulation failed:', error)
            // Still navigate to see the error message
            router.push('/simulation')
        } finally {
            setIsRunning(false)
        }
    }

    return (
        <div className="min-h-screen relative">
            {/* Background */}
            <div className="absolute inset-0 -z-10 h-full w-full bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:64px_64px]"></div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="max-w-3xl mx-auto space-y-8">
                    {/* Header */}
                    <div className="space-y-2">
                        <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-1.5 text-sm font-medium text-white shadow-lg">
                            <Users className="h-4 w-4" />
                            <span>Phase 2: Population & Context</span>
                        </div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Define Population Context
                        </h1>
                        <p className="text-muted-foreground max-w-2xl">
                            Select the population to test against and set structural conditions.
                            <span className="block mt-1 text-sm font-medium text-blue-600">
                                ⚠️ Populations are conservative by default—structural factors shape baseline resistance.
                            </span>
                        </p>
                    </div>

                    {/* Population Settings */}
                    <Card className="border-2 shadow-xl">
                        <CardHeader className="border-b bg-gradient-to-r from-slate-50 to-blue-50">
                            <div className="flex items-center gap-3">
                                <Globe className="h-5 w-5 text-blue-600" />
                                <h2 className="text-xl font-semibold">Population Parameters</h2>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-6 space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="country">Country/Region</Label>
                                <Select
                                    value={populationConfig.country}
                                    onValueChange={(value) => setPopulationConfig({ country: value })}
                                >
                                    <SelectTrigger id="country">
                                        <SelectValue placeholder="Select a country" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="356">India</SelectItem>
                                        <SelectItem value="840">United States</SelectItem>
                                        <SelectItem value="826">United Kingdom</SelectItem>
                                        <SelectItem value="276">Germany</SelectItem>
                                        <SelectItem value="156">China</SelectItem>
                                        <SelectItem value="392">Japan</SelectItem>
                                    </SelectContent>
                                </Select>
                                <p className="text-xs text-muted-foreground">
                                    Population will be sampled from World Values Survey data for this region
                                </p>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="size">Population Size</Label>
                                <Input
                                    id="size"
                                    type="number"
                                    min="10"
                                    max="1000"
                                    value={populationConfig.size}
                                    onChange={(e) => setPopulationConfig({ size: parseInt(e.target.value) || 50 })}
                                    className="text-lg"
                                />
                                <p className="text-xs text-muted-foreground">
                                    Number of agents to simulate (10-1000)
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Structural Context Controls */}
                    <Card className="border-2 shadow-xl bg-gradient-to-br from-amber-50 to-orange-50">
                        <CardHeader className="border-b">
                            <div>
                                <h2 className="text-xl font-semibold">Structural Context</h2>
                                <p className="text-sm text-muted-foreground mt-1">
                                    These factors shape baseline resistance before your scenario is applied
                                </p>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-6 space-y-6">
                            {/* Economic Stress */}
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <Label className="text-base font-medium">Economic Stress</Label>
                                    <span className="text-sm font-mono bg-white px-2 py-1 rounded border">
                                        {populationConfig.economicStress?.toFixed(2) || "0.00"}
                                    </span>
                                </div>
                                <Slider
                                    value={[populationConfig.economicStress || 0]}
                                    onValueChange={([value]) => setPopulationConfig({ economicStress: value })}
                                    min={0}
                                    max={1}
                                    step={0.1}
                                    className="w-full"
                                />
                                <p className="text-xs text-muted-foreground">
                                    💡 Higher stress increases risk aversion and security preference
                                </p>
                            </div>

                            {/* Scarcity Level */}
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <Label className="text-base font-medium">Scarcity Level</Label>
                                    <span className="text-sm font-mono bg-white px-2 py-1 rounded border">
                                        {populationConfig.scarcityLevel?.toFixed(2) || "0.00"}
                                    </span>
                                </div>
                                <Slider
                                    value={[populationConfig.scarcityLevel || 0]}
                                    onValueChange={([value]) => setPopulationConfig({ scarcityLevel: value })}
                                    min={0}
                                    max={1}
                                    step={0.1}
                                    className="w-full"
                                />
                                <p className="text-xs text-muted-foreground">
                                    💡 Scarcity amplifies price sensitivity and reduces openness to change
                                </p>
                            </div>

                            {/* Background Uncertainty */}
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <Label className="text-base font-medium">Background Uncertainty</Label>
                                    <span className="text-sm font-mono bg-white px-2 py-1 rounded border">
                                        {populationConfig.uncertainty?.toFixed(2) || "0.00"}
                                    </span>
                                </div>
                                <Slider
                                    value={[populationConfig.uncertainty || 0]}
                                    onValueChange={([value]) => setPopulationConfig({ uncertainty: value })}
                                    min={0}
                                    max={1}
                                    step={0.1}
                                    className="w-full"
                                />
                                <p className="text-xs text-muted-foreground">
                                    💡 High uncertainty strengthens status quo bias and conformity
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Run Button */}
                    <div className="flex justify-end pt-4">
                        <Button
                            size="lg"
                            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-8"
                            onClick={handleRunSimulation}
                            disabled={isRunning}
                        >
                            {isRunning ? 'Running Simulation...' : 'Run Simulation'}
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
