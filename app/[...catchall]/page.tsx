import { CONTENT_MANIFEST } from "@/lib/content";
import ClientRedirect from "./ClientRedirect";

export const dynamicParams = false;

export function generateStaticParams() {
    // Generate paths strictly for original markdown files
    // so `npm run build` static export doesn't fail
    return CONTENT_MANIFEST.map((item) => ({
        catchall: [item.file],
    }));
}

export default async function CatchAllPage({ params }: { params: Promise<{ catchall: string[] }> }) {
    // Await params as required by Next.js 15+ 
    // Wait, the project is next 16.1.6
    const resolvedParams = await params;

    // Safety check map array to string path
    const file = Array.isArray(resolvedParams?.catchall)
        ? resolvedParams.catchall.join('/')
        : '';

    const manifestItem = CONTENT_MANIFEST.find((item) => item.file === file);

    // Provide target redirect URL
    if (manifestItem) {
        return <ClientRedirect to={`/#${manifestItem.slug}`} />;
    }

    // Default exit (should never happen due to dynamicParams = false)
    return <ClientRedirect to="/" />;
}
