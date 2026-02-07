export function Footer() {
    return (
        <footer className="border-t border-gray-200/50 bg-white/60 backdrop-blur-sm">
            <div className="container mx-auto px-4 flex flex-col items-center justify-between gap-4 py-8 md:h-24 md:flex-row">
                <p className="text-center text-sm text-muted-foreground md:text-left">
                    Built with <span className="text-red-500">♥</span> for serious decision support. Powered by <span className="font-semibold">real population data</span>.
                </p>
                <div className="flex gap-6 text-sm text-muted-foreground">
                    <a href="#" className="hover:text-blue-600 transition-colors">Methodology</a>
                    <a href="#" className="hover:text-blue-600 transition-colors">API</a>
                    <a href="#" className="hover:text-blue-600 transition-colors">GitHub</a>
                </div>
            </div>
        </footer>
    )
}
