'use client';

import Link from 'next/link';
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { registerUser } from '../actions/auth';
import { UserRole } from '@prisma/client';

export default function RegisterPage() {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);
    const [role, setRole] = useState<UserRole>('CUSTOMER');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        const formData = new FormData(e.currentTarget);
        // Append role manually if not in form
        formData.set('role', role);

        const password = formData.get('password') as string;
        const confirmPassword = formData.get('confirmPassword') as string;

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        startTransition(async () => {
            const result = await registerUser(formData);
            if (result.success) {
                router.push('/login?registered=true');
            } else {
                setError(result.error || "Registration failed");
            }
        });
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-serif font-bold text-secondary mb-2">Create Account</h1>
                    <p className="text-muted-foreground">Join the Precious Hope community</p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4 text-center">
                        {error}
                    </div>
                )}

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-secondary mb-1">Full Name</label>
                        <input
                            name="name"
                            type="text"
                            required
                            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:border-primary transition-colors"
                            placeholder="John Doe"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-secondary mb-1">Email Address</label>
                        <input
                            name="email"
                            type="email"
                            required
                            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:border-primary transition-colors"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-secondary mb-1">Password</label>
                        <input
                            name="password"
                            type="password"
                            required
                            minLength={6}
                            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:border-primary transition-colors"
                            placeholder="••••••••"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-secondary mb-1">Confirm Password</label>
                        <input
                            name="confirmPassword"
                            type="password"
                            required
                            minLength={6}
                            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:border-primary transition-colors"
                            placeholder="••••••••"
                        />
                    </div>

                    {/* Simple Role Selection for Demo/MVP */}
                    <div>
                        <label className="block text-sm font-medium text-secondary mb-2">I want to:</label>
                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={() => setRole('CUSTOMER')}
                                className={`flex-1 py-2 text-xs font-bold uppercase rounded-md border transition-colors ${role === 'CUSTOMER' ? 'bg-secondary text-white border-secondary' : 'bg-white text-slate-500 border-slate-200'}`}
                            >
                                Buy
                            </button>
                            <button
                                type="button"
                                onClick={() => setRole('SELLER')}
                                className={`flex-1 py-2 text-xs font-bold uppercase rounded-md border transition-colors ${role === 'SELLER' ? 'bg-secondary text-white border-secondary' : 'bg-white text-slate-500 border-slate-200'}`}
                            >
                                Sell
                            </button>
                        </div>
                    </div>

                    <button
                        disabled={isPending}
                        className="w-full py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 mt-2 disabled:opacity-70"
                    >
                        {isPending ? 'Creating Account...' : 'Create Account'}
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                    <p className="text-sm text-slate-500">
                        Already have an account? <Link href="/login" className="text-primary font-bold hover:underline">Sign in</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
