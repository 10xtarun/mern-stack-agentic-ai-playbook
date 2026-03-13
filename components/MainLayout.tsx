"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isLandingPage = pathname === "/";

    return (
        <div className="min-h-screen flex flex-col text-foreground bg-transparent w-full">
            <div className="flex flex-1 w-full">
                <Sidebar />
                <main className={`flex-1 w-full relative min-h-screen ${isLandingPage ? "" : "md:ml-64 pt-16 md:pt-0"} transition-all duration-300 flex flex-col`}>
                    <div className="flex-1">
                        {children}
                    </div>
                    <Footer />
                </main>
            </div>
        </div>
    );
}
