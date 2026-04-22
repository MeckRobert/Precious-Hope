'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type User = {
    name: string;
    email: string;
    role: string;
    avatar: string;
};

export default function ProfilePage() {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchSession = async () => {
            try {
                const res = await fetch('/api/session');
                const data = await res.json();

                if (!data) {
                    router.push('/login');
                } else {
                    setUser(data);
                }
            } catch (error) {
                router.push('/login');
            } finally {
                setIsLoading(false);
            }
        };

        fetchSession();
    }, [router]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row gap-8 items-start mb-12">
                <div className="flex-shrink-0">
                    <div className="w-24 h-24 rounded-full overflow-hidden bg-slate-200 border-4 border-white shadow-lg">
                        <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                    </div>
                </div>
                <div>
                    <h1 className="text-3xl font-serif font-bold text-secondary">{user.name}</h1>
                    <p className="text-muted-foreground">{user.email}</p>
                    <span className="inline-block mt-2 px-3 py-1 bg-secondary/10 text-secondary text-xs font-bold rounded-full uppercase tracking-wide">
                        {user.role} Account
                    </span>
                </div>
            </div>

            {/* SIMPLE ROLE DISPLAY (NO SERVER IMPORTS) */}
            <div className="bg-white rounded-2xl shadow-xl border p-6">
                {user.role === 'CUSTOMER' && <p>Customer Dashboard</p>}
                {user.role === 'SELLER' && <p>Seller Dashboard</p>}
                {user.role === 'ADMIN' && <p>Admin Dashboard</p>}
            </div>
        </div>
    );
}