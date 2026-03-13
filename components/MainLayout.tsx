"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isLandingPage = pathname === "/";

    return (
        <div className="min-h-screen flex text-foreground bg-background w-full">
            <Sidebar />
            <main className={`flex-1 w-full relative min-h-screen ${isLandingPage ? "" : "md:ml-64 pt-16 md:pt-0"} pb-16 transition-all duration-300`}>
                {children}
            </main>
        </div>
    );
}
