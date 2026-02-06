import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Github, Globe, Copy, Check, ExternalLink } from 'lucide-react'
import { useState } from 'react'
import { Button } from '../ui/button'

export function CaseStudyShell({ children, title, url, githubUrl, liveUrl }) {
    const navigate = useNavigate();
    const [copied, setCopied] = useState(false);

    const copyUrl = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col pt-[72px]">
            {/* Premium Browser-like Header */}
            <header className="fixed top-0 left-0 right-0 h-[72px] bg-background/80 backdrop-blur-md border-b border-border/40 z-50 flex items-center px-4 sm:px-6">
                <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-4">

                    {/* Left: Back Link */}
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors group"
                    >
                        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="hidden sm:inline">Back to Portfolio</span>
                        <span className="sm:hidden">Back</span>
                    </button>

                    {/* Center: Subtle Browser Bar */}
                    <div className="hidden md:flex flex-1 max-w-xl items-center gap-2 px-4 py-2 bg-secondary/50 rounded-full border border-border/50 text-muted-foreground/60 text-xs">
                        <Globe className="h-3 w-3 shrink-0" />
                        <span className="truncate flex-1 select-all">{url}</span>
                        <button onClick={copyUrl} className="hover:text-primary transition-colors">
                            {copied ? <Check className="h-3 w-3 text-green-500" /> : <Copy className="h-3 w-3" />}
                        </button>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-2 sm:gap-4">
                        {githubUrl && (
                            <Button variant="ghost" size="sm" asChild className="hidden sm:flex py-0 h-9">
                                <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                                    <Github className="h-4 w-4 mr-2" />
                                    Code
                                </a>
                            </Button>
                        )}
                        {liveUrl && (
                            <Button variant="default" size="sm" asChild className="h-9 px-4 sm:px-5 shadow-lg shadow-primary/20">
                                <a href={liveUrl} target="_blank" rel="noopener noreferrer">
                                    <ExternalLink className="h-4 w-4 mr-2" />
                                    Live Demo
                                </a>
                            </Button>
                        )}
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 w-full max-w-5xl mx-auto px-6 py-12 sm:py-20 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                {children}
            </main>

            {/* Footer / Contact CTA */}
            <footer className="border-t border-border/40 py-12 bg-secondary/20">
                <div className="max-w-5xl mx-auto px-6 text-center">
                    <h2 className="text-2xl font-bold mb-4">Interested in working together?</h2>
                    <Button variant="outline" onClick={() => navigate('/#contact')}>
                        Get in Touch
                    </Button>
                </div>
            </footer>
        </div>
    )
}
