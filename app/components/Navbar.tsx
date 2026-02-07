'use client';

import Link from 'next/link';
import { ShoppingCart, Menu, Search, User } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
    const { cartCount } = useCart();
    const { user, isAuthenticated, logout } = useAuth();

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 glass transition-all duration-300">
            <div className="container mx-auto px-4 lg:px-8 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="text-2xl font-serif font-bold text-secondary tracking-tight">
                    Precious<span className="text-primary">Hope</span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-8">
                    <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
                        Home
                    </Link>
                    <Link href="/store" className="text-sm font-medium hover:text-primary transition-colors">
                        Store
                    </Link>
                    <Link href="/teachings" className="text-sm font-medium hover:text-primary transition-colors">
                        Teachings
                    </Link>
                    <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
                        About Us
                    </Link>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-4">
                    <button className="p-2 hover:bg-muted rounded-full transition-colors" aria-label="Search">
                        <Search className="w-5 h-5 text-muted-foreground" />
                    </button>
                    <Link href="/cart" className="p-2 hover:bg-muted rounded-full transition-colors relative" aria-label="Cart">
                        <ShoppingCart className="w-5 h-5 text-muted-foreground" />
                        {cartCount > 0 && (
                            <span className="absolute top-1 right-1 w-4 h-4 text-[10px] flex items-center justify-center bg-primary text-white rounded-full">
                                {cartCount}
                            </span>
                        )}
                    </Link>

                    {isAuthenticated && user ? (
                        <div className="relative group">
                            <Link href="/profile" className="flex items-center gap-2 pl-2 pr-4 py-1.5 rounded-full hover:bg-muted transition-colors border border-transparent hover:border-slate-200">
                                <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-200">
                                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                                </div>
                                <span className="text-sm font-medium text-secondary hidden md:block">{user.name}</span>
                            </Link>

                            {/* Dropdown Menu */}
                            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform origin-top-right z-50">
                                <div className="p-2">
                                    <div className="px-3 py-2 border-b border-slate-50 mb-1">
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{user.role}</p>
                                    </div>
                                    <Link href="/profile" className="block px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg hover:text-secondary">Dashboard</Link>
                                    <button
                                        onClick={logout}
                                        className="w-full text-left px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <Link href="/login" className="hidden md:block bg-secondary text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-secondary/90 transition-colors">
                            Sign In
                        </Link>
                    )}

                    {/* Mobile Menu Button */}
                    <button className="md:hidden p-2 hover:bg-muted rounded-full transition-colors">
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </nav>
    );
}
