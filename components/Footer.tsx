"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
    const pathname = usePathname();
    const isLandingPage = pathname === "/";

    return (
        <footer className="w-full border-t border-white/5 bg-bg-card/50 backdrop-blur-sm pt-20 pb-10 px-6 md:px-12">
            <div className="max-w-7xl mx-auto">
                {/* Unified Discovery & Navigation Section */}
                {!isLandingPage && (
                    <div className="mb-16 text-center">
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-4 font-mono">Switch Paths Anytime</p>
                        <h2 className="text-2xl md:text-3xl font-extrabold mb-8">Ready to explore another track?</h2>
                        
                        <div className="flex flex-wrap gap-4 justify-center">
                            <Link href="/mern" className="bg-primary/10 border border-primary/20 text-primary px-6 py-2.5 rounded-full text-sm font-bold hover:bg-primary/20 transition-all">
                                MERN Stack Mastery
                            </Link>
                            <Link href="/data-science" className="bg-purple-500/10 border border-purple-500/20 text-purple-400 px-6 py-2.5 rounded-full text-sm font-bold hover:bg-purple-500/20 transition-all">
                                Data Science & AI
                            </Link>
                            <Link href="/cloud-devops" className="bg-orange-500/10 border border-orange-500/20 text-orange-400 px-6 py-2.5 rounded-full text-sm font-bold hover:bg-orange-500/20 transition-all">
                                Cloud & DevOps
                            </Link>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 pt-8 border-t border-white/5">
                    <div className="md:col-span-2">
                        <Link href="/" className="text-2xl font-extrabold tracking-tight mb-6 block">
                            <span className="text-gradient">Course</span>Playbook
                        </Link>
                        <p className="max-w-md text-foreground/50 leading-relaxed text-sm">
                            The professional engineering playbook for high-impact technical preparation. 12 weeks of hands-on curriculum, industry simulations, and production-grade capstones.
                        </p>
                    </div>
                    
                    <div className="flex flex-col md:items-end">
                        <h4 className="font-bold mb-4 text-sm uppercase tracking-widest text-foreground/30">Jump To</h4>
                        <ul className="space-y-3 text-sm text-foreground/50 text-left md:text-right">
                            <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
                            <li><Link href="/mern" className="hover:text-primary transition-colors">MERN Stack</Link></li>
                            <li><Link href="/data-science" className="hover:text-primary transition-colors">Data Science</Link></li>
                            <li><Link href="/cloud-devops" className="hover:text-primary transition-colors">Cloud & DevOps</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-foreground/30 font-medium">
                    <div className="flex items-center gap-2">
                         <div className="h-2 w-2 rounded-full bg-accent-2 animate-pulse"></div>
                         <p>&copy; {new Date().getFullYear()} Course Playbook. All rights reserved.</p>
                    </div>
                    <div className="flex gap-8">
                        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                        <Link href="#hero" className="hover:text-primary transition-colors">Back to Top</Link>
                        <Link href="#" className="hover:text-primary transition-colors">Support</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
