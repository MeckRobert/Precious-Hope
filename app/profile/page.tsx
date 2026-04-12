'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import CustomerDashboard from '../components/dashboard/customer/page';
import SellerDashboard from '../components/dashboard/seller/page';
import AdminDashboard from '../components/dashboard/admin/page';

export default function ProfilePage() {
    const { user, isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push('/login');
        }
    }, [isLoading, isAuthenticated, router]);

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

            <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden min-h-[400px]">
                {user.role === 'customer' && <CustomerDashboard />}
                {user.role === 'seller' && <SellerDashboard />}
                {user.role === 'admin' && <AdminDashboard />}
            </div>
        </div>
    );
}
