'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUser } from '../actions/auth';
// Import types from Prisma (or define matching ones)
// Since we can't import actual values from @prisma/client in client components easily without setup, 
// we will define matching types or just use string for Role for now to be safe.
export type UserRole = 'CUSTOMER' | 'SELLER' | 'ADMIN';

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    avatar?: string;
    profile?: {
        name: string;
        avatar?: string | null;
    };
}

interface AuthContextType {
    user: User | null;
    login: (formData: FormData) => Promise<{ success: boolean; error?: string }>;
    logout: () => void;
    isAuthenticated: boolean;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Simulate session check on load
    useEffect(() => {
        const storedUser = localStorage.getItem('user_session');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                console.error("Failed to restore session", e);
                localStorage.removeItem('user_session');
            }
        }
        setIsLoading(false);
    }, []);

    const login = async (formData: FormData) => {
        setIsLoading(true);

        try {
            const result = await loginUser(formData);

            if (result.success && result.user) {
                // Map Prisma user to Context User
                // We need to ensure types match. 
                // The server action returns the Prisma User object.
                // We cast it to any for simplicity in this transition or map explicitly.
                const dbUser = result.user as any;

                const authUser: User = {
                    id: dbUser.id,
                    name: dbUser.profile?.name || dbUser.email.split('@')[0],
                    email: dbUser.email,
                    role: dbUser.role as UserRole,
                    avatar: dbUser.profile?.avatar || `https://ui-avatars.com/api/?name=${dbUser.email}&background=random`
                };

                setUser(authUser);
                localStorage.setItem('user_session', JSON.stringify(authUser));
                setIsLoading(false);
                return { success: true };
            } else {
                setIsLoading(false);
                return { success: false, error: result.error };
            }
        } catch (error) {
            setIsLoading(false);
            return { success: false, error: "An unexpected error occurred" };
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user_session');
        // Optional: Redirect to home or login
        window.location.href = '/';
    };

    return (
        <AuthContext.Provider value={{
            user,
            login,
            logout,
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
