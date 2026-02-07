import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-200/50 bg-white/80 backdrop-blur-md shadow-sm">
            <div className="container mx-auto px-4 flex h-16 items-center justify-between">
                <div className="flex items-center gap-8">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="p-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600">
                            <Sparkles className="h-5 w-5 text-white" />
                        </div>
                        <span className="font-bold text-xl bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent">
                            Simulation AI
                        </span>
                    </Link>
                </div>
                <div className="flex items-center gap-3">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="hover:bg-blue-50"
                        asChild
                    >
                        <Link href="/scenario">New Scenario</Link>
                    </Button>
                    <Button
                        size="sm"
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-md"
                        asChild
                    >
                        <Link href="/scenario">Run Simulation</Link>
                    </Button>
                </div>
            </div>
        </header>
    )
}
