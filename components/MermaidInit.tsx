"use client";

import { useEffect } from "react";
import mermaid from "mermaid";

export default function MermaidInit() {
    useEffect(() => {
        mermaid.initialize({
            startOnLoad: true,
            theme: "default",
            securityLevel: "loose",
        });
        mermaid.contentLoaded();
    }, []);

    return null;
}
