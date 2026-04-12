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
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
    const [role, setRole] = useState<UserRole>('CUSTOMER');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setFieldErrors({});

        const formData = new FormData(e.currentTarget);
        
        // Get passwords for client-side validation
        const password = formData.get('password') as string;
        const confirmPassword = formData.get('confirmPassword') as string;

        // Client-side validation
        if (password !== confirmPassword) {
            setFieldErrors({ confirmPassword: "Passwords do not match" });
            return;
        }

        if (password.length < 6) {
            setFieldErrors({ password: "Password must be at least 6 characters" });
            return;
        }

        // Append role to form data
        formData.set('role', role);

        startTransition(async () => {
            try {
                const result = await registerUser(formData);
                
                if (result && result.success) {
                    // Success - redirect to login
                    router.push('/login?registered=true');
                } else {
                    // Handle error response
                    setError(result?.error || "Registration failed. Please try again.");
                }
            } catch (err) {
                console.error('Unexpected error:', err);
                setError("An unexpected error occurred. Please try again.");
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

                {/* General error message */}
                {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4 text-center border border-red-100">
                        {error}
                    </div>
                )}

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-secondary mb-1">
                            Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            name="name"
                            type="text"
                            required
                            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:border-primary transition-colors"
                            placeholder="Meck Michael"
                        />
                        {fieldErrors.name && (
                            <p className="text-red-500 text-xs mt-1">{fieldErrors.name}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-secondary mb-1">
                            Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                            name="email"
                            type="email"
                            required
                            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:border-primary transition-colors"
                            placeholder="meck@gmail.com"
                        />
                        {fieldErrors.email && (
                            <p className="text-red-500 text-xs mt-1">{fieldErrors.email}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-secondary mb-1">
                            Password <span className="text-red-500">*</span>
                        </label>
                        <input
                            name="password"
                            type="password"
                            required
                            minLength={6}
                            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:border-primary transition-colors"
                            placeholder="••••••••"
                        />
                        {fieldErrors.password && (
                            <p className="text-red-500 text-xs mt-1">{fieldErrors.password}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-secondary mb-1">
                            Confirm Password <span className="text-red-500">*</span>
                        </label>
                        <input
                            name="confirmPassword"
                            type="password"
                            required
                            minLength={6}
                            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:border-primary transition-colors"
                            placeholder="••••••••"
                        />
                        {fieldErrors.confirmPassword && (
                            <p className="text-red-500 text-xs mt-1">{fieldErrors.confirmPassword}</p>
                        )}
                    </div>

                    {/* Hidden role field - you can make this visible if you want users to select their role */}
                    <input type="hidden" name="role" value={role} />
                    
                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isPending ? (
                            <span className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Creating Account...
                            </span>
                        ) : 'Create Account'}
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                    <p className="text-sm text-slate-500">
                        Already have an account?{' '}
                        <Link href="/login" className="text-primary font-bold hover:underline">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}