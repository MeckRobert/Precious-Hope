'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getRedirectPathFromRole } from '@/lib/session-client';

// Define UserRole type to match Prisma
export type UserRole = 'CUSTOMER' | 'SELLER' | 'ADMIN';

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    avatar?: string;
}

interface AuthContextType {
    user: User | null;
    login: (formData: FormData) => Promise<{ success: boolean; error?: string; user?: User }>;
    logout: () => Promise<void>;
    isAuthenticated: boolean;
    isLoading: boolean;
    refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    // Check session on load
    useEffect(() => {
        refreshUser();
    }, []);

    const refreshUser = async () => {
        try {
            const response = await fetch('/api/auth/me');
            if (response.ok) {
                const data = await response.json();
                if (data.user) {
                    const authUser: User = {
                        id: data.user.id,
                        name: data.user.name,
                        email: data.user.email,
                        role: data.user.role as UserRole,
                        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(data.user.name)}&background=random`
                    };
                    setUser(authUser);
                } else {
                    setUser(null);
                }
            } else {
                setUser(null);
            }
        } catch (error) {
            console.error('Failed to refresh user:', error);
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (formData: FormData) => {
        setIsLoading(true);

        try {
            // Dynamically import to avoid circular dependencies
            const { loginUser } = await import('@/app/actions/auth');
            const result = await loginUser(formData);

            if (result.success && result.user) {
                const authUser: User = {
                    id: result.user.id,
                    name: result.user.name,
                    email: result.user.email,
                    role: result.user.role as UserRole,
                    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(result.user.name)}&background=random`
                };

                setUser(authUser);
                setIsLoading(false);
                
                // Return success with user data for redirection
                return { 
                    success: true, 
                    user: authUser,
                    redirectTo: result.redirectTo || getRedirectPathFromRole(authUser.role)
                };
            } else {
                setIsLoading(false);
                return { success: false, error: result.error };
            }
        } catch (error) {
            console.error('Login error:', error);
            setIsLoading(false);
            return { success: false, error: "An unexpected error occurred" };
        }
    };

    const logout = async () => {
        try {
            const { logoutUser } = await import('@/app/actions/auth');
            await logoutUser();
            setUser(null);
            router.push('/');
            router.refresh();
        } catch (error) {
            console.error('Logout error:', error);
            // Fallback to client-side only logout
            setUser(null);
            window.location.href = '/';
        }
    };

    return (
        <AuthContext.Provider value={{
            user,
            login,
            logout,
            refreshUser,
            isAuthenticated: !!user,
            isLoading
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}