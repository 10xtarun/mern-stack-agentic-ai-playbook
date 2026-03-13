"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getSectionByTrack } from '@/lib/content';

export default function Sidebar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    
    // Hide sidebar on the main landing page
    const isLandingPage = pathname === '/';
    
    // Extract track from pathname (e.g., /mern -> mern)
    const track = pathname.split('/')[1];
    const section = getSectionByTrack(track);

    // Filter content manifest by the current track
    const trackContent = section ? section.items : [];

    const navLinks = [
        { href: "#hero", label: "Overview" },
        { href: "#curriculum", label: "Curriculum" },
        { href: "#capstones", label: "Capstones" },
        ...trackContent.map(item => ({
            href: `#${item.slug}`,
            label: item.title,
        }))
    ];

    // Close sidebar on resize for mobile
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

    if (isLandingPage) return null;

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
            <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-glass border-b border-white/10 z-50 flex items-center justify-between px-4">
                <Link href="/" className="text-xl font-extrabold tracking-tight" onClick={() => setIsOpen(false)}>
                    <span className="text-gradient">Course</span>Playbook
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
                className={`fixed top-0 left-0 h-full w-64 bg-glass border-r border-white/5 z-50 transform transition-transform duration-300 ease-in-out md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    } flex flex-col`}
            >
                {/* Logo Desktop */}
                <div className="hidden md:flex h-16 items-center px-6 border-b border-white/5 shrink-0">
                    <Link href="/" className="text-2xl font-extrabold tracking-tight hover:opacity-80 transition-opacity">
                        <span className="text-gradient">Course</span>Playbook
                    </Link>
                </div>

                {/* Mobile Header in Sidebar text (only visible when open) */}
                <div className="md:hidden flex h-16 items-center justify-between px-6 border-b border-white/5 shrink-0">
                    <span className="text-xl font-bold">Menu</span>
                    <button onClick={toggleSidebar} className="p-2 -mr-2 text-foreground/80 hover:text-primary">
                        {CloseIcon}
                    </button>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-1">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className="px-4 py-2 text-sm font-medium rounded-lg text-foreground/50 hover:bg-white/5 hover:text-primary transition-all truncate"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Bottom Actions */}
                <div className="p-4 border-t border-white/5 shrink-0 flex flex-col gap-2">
                    <Link
                        href="#hero"
                        onClick={() => setIsOpen(false)}
                        className="flex w-full h-10 items-center justify-center rounded-lg border border-white/10 text-foreground/50 text-sm font-medium transition-colors hover:bg-white/5"
                    >
                        Return to Top
                    </Link>
                    <Link
                        href="/"
                        onClick={() => setIsOpen(false)}
                        className="flex w-full h-10 items-center justify-center rounded-lg bg-primary text-white text-sm font-bold transition-all hover:bg-primary-hover shadow-lg shadow-primary/20"
                    >
                        Home
                    </Link>
                </div>
            </aside>
        </>
    );
}
