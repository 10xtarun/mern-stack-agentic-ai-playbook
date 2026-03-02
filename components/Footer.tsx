import Link from 'next/link';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full border-t border-foreground/10 bg-background pt-16 pb-8">
            <div className="mx-auto max-w-7xl px-6">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:grid-cols-5">
                    <div className="col-span-1 md:col-span-2 lg:col-span-2">
                        <Link href="/" className="text-xl font-bold tracking-tight">
                            <span className="text-gradient">Intern</span>Age
                        </Link>
                        <p className="mt-4 max-w-xs text-sm text-foreground/70 leading-relaxed">
                            Empowering the next generation of full-stack developers through rigorous,
                            hands-on MERN stack training and verified daily internships.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold mb-4 text-foreground/90">Curriculum</h3>
                        <ul className="flex flex-col gap-3 text-sm text-foreground/70">
                            <li><Link href="#" className="hover:text-primary transition-colors">Foundation</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">React & Next.js</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Backend APIs</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Capstone Projects</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold mb-4 text-foreground/90">Resources</h3>
                        <ul className="flex flex-col gap-3 text-sm text-foreground/70">
                            <li><Link href="#" className="hover:text-primary transition-colors">Daily Diary</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Setup Guide</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Documentation</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">GitHub Group</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold mb-4 text-foreground/90">Company</h3>
                        <ul className="flex flex-col gap-3 text-sm text-foreground/70">
                            <li><Link href="#" className="hover:text-primary transition-colors">About Us</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Contact</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-16 border-t border-foreground/10 pt-8 flex flex-col items-center justify-between gap-4 md:flex-row text-sm text-foreground/60">
                    <p>&copy; {currentYear} InternAge. All rights reserved.</p>
                    <div className="flex gap-4">
                        <Link href="#" className="hover:text-primary transition-colors">Twitter</Link>
                        <Link href="#" className="hover:text-primary transition-colors">GitHub</Link>
                        <Link href="#" className="hover:text-primary transition-colors">LinkedIn</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
