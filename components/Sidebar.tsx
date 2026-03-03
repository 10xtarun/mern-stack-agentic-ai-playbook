"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { CONTENT_MANIFEST } from '@/lib/content';

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("");

    // Close sidebar on route change for mobile
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleSidebar = () => setIsOpen(!isOpen);

    const navLinks = [
        { href: "#hero", label: "Home" },
        ...CONTENT_MANIFEST.map(item => ({
            href: `#${item.slug}`,
            label: item.title,
        }))
    ];

    const MenuIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" />
        </svg>
    );

    const CloseIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6 6 18" /><path d="m6 6 12 12" />
        </svg>
    );

    return (
        <>
            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-background/95 backdrop-blur-md border-b border-foreground/10 z-50 flex items-center justify-between px-4">
                <Link href="/" className="text-xl font-bold tracking-tight" onClick={() => setIsOpen(false)}>
                    <span className="text-gradient">Intern</span>Age
                </Link>
                <button
                    onClick={toggleSidebar}
                    className="p-2 text-foreground/80 hover:text-primary transition-colors focus:outline-none"
                    aria-label="Toggle menu"
                >
                    {isOpen ? CloseIcon : MenuIcon}
                </button>
            </div>

            {/* Sidebar Overlay for Mobile */}
            {isOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-40 transition-opacity"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar Desktop + Mobile Off-canvas */}
            <aside
                className={`fixed top-0 left-0 h-full w-64 bg-background border-r border-foreground/10 z-50 transform transition-transform duration-300 ease-in-out md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    } flex flex-col`}
            >
                {/* Logo Desktop */}
                <div className="hidden md:flex h-16 items-center px-6 border-b border-foreground/10 shrink-0">
                    <Link href="#hero" className="text-2xl font-bold tracking-tight hover:opacity-80 transition-opacity">
                        <span className="text-gradient">Intern</span>Age
                    </Link>
                </div>

                {/* Mobile Header in Sidebar text (only visible when open) */}
                <div className="md:hidden flex h-16 items-center justify-between px-6 border-b border-foreground/10 shrink-0">
                    <span className="text-xl font-bold">Menu</span>
                    <button onClick={toggleSidebar} className="p-2 -mr-2 text-foreground/80 hover:text-primary">
                        {CloseIcon}
                    </button>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-2">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className="px-4 py-2 text-sm font-medium rounded-lg text-foreground/70 hover:bg-primary/10 hover:text-primary transition-colors truncate"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Bottom Actions */}
                <div className="p-4 border-t border-foreground/10 shrink-0 flex flex-col gap-2">
                    <Link
                        href="#hero"
                        onClick={() => setIsOpen(false)}
                        className="flex w-full h-10 items-center justify-center rounded-lg bg-primary/10 text-primary font-medium transition-colors hover:bg-primary/20"
                    >
                        Return to Top
                    </Link>
                    <Link
                        href="#capstone-projects"
                        onClick={() => setIsOpen(false)}
                        className="flex w-full h-10 items-center justify-center rounded-lg bg-primary text-white font-medium transition-colors hover:bg-primary-hover shadow-[0_0_10px_rgba(99,102,241,0.3)]"
                    >
                        Start Course
                    </Link>
                </div>
            </aside>
        </>
    );
}
