"use client";

import { useEffect, useState } from "react";

export default function ClientRedirect({ to }: { to: string }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        let finalUrl = to;

        // If the URL has a hash like #hero, preserve it
        if (window.location.hash) {
            const hash = window.location.hash;
            // If we're redirecting to /#week-01, but the url has #hero, just jump to #hero
            if (to.includes('#')) {
                finalUrl = `/${hash}`;
            } else {
                finalUrl = `${to}${hash}`;
            }
        }

        window.location.replace(finalUrl);
    }, [to]);

    // Don't flash text on server side, wait for client mount
    if (!mounted) return null;

    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="flex flex-col items-center">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-foreground/60 font-medium">Redirecting to section...</p>
            </div>
        </div>
    );
}
