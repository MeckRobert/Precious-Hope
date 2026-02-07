import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-9xl font-serif font-bold text-primary/20">404</h1>
            <h2 className="text-3xl font-bold text-secondary mt-[-2rem] mb-4">Page Not Found</h2>
            <p className="text-muted-foreground max-w-md mb-8">
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>

            <div className="flex gap-4">
                <Link href="/" className="px-6 py-3 bg-secondary text-white font-bold rounded-full hover:bg-secondary/90 transition-colors flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" /> Go Home
                </Link>
                <Link href="/store" className="px-6 py-3 bg-white border border-slate-200 text-secondary font-bold rounded-full hover:bg-slate-50 transition-colors">
                    Browse Store
                </Link>
            </div>
        </div>
    );
}
