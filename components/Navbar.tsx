import Link from 'next/link';

export default function Navbar() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-foreground/10 bg-background/70 backdrop-blur-md transition-all">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                <div className="flex items-center gap-2">
                    {/* Logo */}
                    <Link href="/" className="text-xl font-bold tracking-tight hover:opacity-80 transition-opacity">
                        <span className="text-gradient">Intern</span>Age
                    </Link>
                </div>

                <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
                    <Link href="#features" className="text-foreground/80 hover:text-primary transition-colors">
                        Features
                    </Link>
                    <Link href="#curriculum" className="text-foreground/80 hover:text-primary transition-colors">
                        Curriculum
                    </Link>
                    <Link href="#testimonials" className="text-foreground/80 hover:text-primary transition-colors">
                        Testimonials
                    </Link>
                </nav>

                <div className="flex items-center gap-4">
                    <Link
                        href="/login"
                        className="text-sm font-medium hover:text-primary transition-colors"
                    >
                        Log in
                    </Link>
                    <Link
                        href="/start"
                        className="flex h-9 items-center justify-center rounded-full bg-primary px-4 text-sm font-medium text-white transition-colors hover:bg-primary-hover shadow-[0_0_15px_rgba(99,102,241,0.5)] hover:shadow-[0_0_20px_rgba(99,102,241,0.7)]"
                    >
                        Get Started
                    </Link>
                </div>
            </div>
        </header>
    );
}
