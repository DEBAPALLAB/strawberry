import { create } from 'zustand'

interface SimulationState {
    scenarioText: string
    setScenarioText: (text: string) => void

    parameters: {
        benefit: number
        price: number
        uncertainty: number
        social_signal: number
        scarcity_level: number
    }
    setParameter: (key: keyof SimulationState['parameters'], value: number) => void

    populationConfig: {
        country: string
        size: number
        economicStress?: number
        scarcityLevel?: number
        uncertainty?: number
    }
    setPopulationConfig: (config: Partial<SimulationState['populationConfig']>) => void

    // Simulation results
    results: any | null
    isLoading: boolean
    error: string | null

    // Actions
    runSimulation: () => Promise<void>
    setResults: (results: any) => void
    setError: (error: string | null) => void
}

export const useSimulationStore = create<SimulationState>((set, get) => ({
    scenarioText: '',
    setScenarioText: (text) => set({ scenarioText: text }),

    parameters: {
        benefit: 0.5,
        price: 0.5,
        uncertainty: 0.5,
        social_signal: 0.0,
        scarcity_level: 0.0,
    },
    setParameter: (key, value) =>
        set((state) => ({ parameters: { ...state.parameters, [key]: value } })),

    populationConfig: {
        country: '356', // Default to India (code 356)
        size: 50,
    },
    setPopulationConfig: (config) =>
        set((state) => ({ populationConfig: { ...state.populationConfig, ...config } })),

    // Simulation results
    results: null,
    isLoading: false,
    error: null,

    setResults: (results) => set({ results, error: null }),
    setError: (error) => set({ error, isLoading: false }),

    runSimulation: async () => {
        const state = get()
        set({ isLoading: true, error: null })

        try {
            const response = await fetch('http://localhost:8000/run-simulation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    scenario_text: state.scenarioText,
                    country_code: parseInt(state.populationConfig.country),
                    num_agents: state.populationConfig.size,
                    // Structural controls
                    economic_stress: state.populationConfig.economicStress || 0,
                    scarcity_level: state.populationConfig.scarcityLevel || 0,
                    background_uncertainty: state.populationConfig.uncertainty || 0,
                }),
            })

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ detail: 'Unknown error' }))
                throw new Error(errorData.detail || `HTTP error! status: ${response.status}`)
            }

            const data = await response.json()
            set({ results: data, isLoading: false, error: null })
        } catch (error: any) {
            set({
                error: error.message || 'Failed to run simulation',
                isLoading: false
            })
        }
    },
}))
