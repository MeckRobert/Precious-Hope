'use client';

import Link from 'next/link';
import { ShoppingCart, Menu, Search, User, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

export default function Navbar() {
    const { cartCount } = useCart();
    const { user, isAuthenticated, logout } = useAuth();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
    const closeMobileMenu = () => setMobileMenuOpen(false);

    // Navigation links
    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/store', label: 'Store' },
        { href: '/teachings', label: 'Teachings' },
        { href: '/about', label: 'About Us' },
    ];

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-50 glass transition-all duration-300">
                <div className="container mx-auto px-4 lg:px-8 h-16 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="text-xl sm:text-2xl font-serif font-bold text-secondary tracking-tight whitespace-nowrap">
                        Precious<span className="text-primary">Hope</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-sm font-medium hover:text-primary transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-2 sm:space-x-4">
                        <button className="p-2 hover:bg-muted rounded-full transition-colors" aria-label="Search">
                            <Search className="w-5 h-5 text-muted-foreground" />
                        </button>

                        <Link href="/cart" className="p-2 hover:bg-muted rounded-full transition-colors relative" aria-label="Cart">
                            <ShoppingCart className="w-5 h-5 text-muted-foreground" />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 w-4 h-4 text-[10px] flex items-center justify-center bg-primary text-white rounded-full">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        {/* Desktop Auth */}
                        {isAuthenticated && user ? (
                            <div className="relative group hidden md:block">
                                <div className="flex items-center gap-2 pl-2 pr-4 py-1.5 rounded-full hover:bg-muted transition-colors border border-transparent hover:border-slate-200 cursor-pointer">
                                    <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-200">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                                    </div>
                                    <span className="text-sm font-medium text-secondary hidden lg:block">{user.name}</span>
                                </div>
                                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform origin-top-right z-50">
                                    <div className="p-2">
                                        <div className="px-3 py-2 border-b border-slate-50 mb-1">
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{user.role}</p>
                                        </div>
                                        <Link href="/profile" className="block px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg hover:text-secondary">
                                            Dashboard
                                        </Link>
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
                        <button
                            onClick={toggleMobileMenu}
                            className="md:hidden p-2 hover:bg-muted rounded-full transition-colors relative"
                            aria-label="Menu"
                        >
                            <Menu className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Drawer Overlay */}
            {mobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-50 md:hidden"
                    onClick={closeMobileMenu}
                    aria-hidden="true"
                />
            )}

            {/* Mobile Drawer Sidebar */}
            <div
                className={`fixed top-0 right-0 w-[280px] h-full bg-white shadow-2xl z-50 transition-transform duration-300 ease-in-out md:hidden ${
                    mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <div className="flex flex-col h-full">
                    {/* Drawer Header */}
                    <div className="flex items-center justify-between p-4 border-b border-slate-100">
                        <span className="font-serif font-bold text-secondary">Menu</span>
                        <button
                            onClick={closeMobileMenu}
                            className="p-2 rounded-full hover:bg-muted transition-colors"
                            aria-label="Close menu"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Drawer Navigation */}
                    <div className="flex-1 py-6 px-4">
                        <ul className="space-y-4">
                            {navLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        onClick={closeMobileMenu}
                                        className="block text-base font-medium text-slate-700 hover:text-primary transition-colors py-2"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Drawer Auth Section */}
                    <div className="p-4 border-t border-slate-100">
                        {isAuthenticated && user ? (
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-200">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-secondary">{user.name}</p>
                                        <p className="text-xs text-slate-400">{user.role}</p>
                                    </div>
                                </div>
                                <Link
                                    href="/profile"
                                    onClick={closeMobileMenu}
                                    className="block w-full text-center bg-secondary text-white py-2 rounded-full text-sm font-medium hover:bg-secondary/90 transition-colors"
                                >
                                    Dashboard
                                </Link>
                                <button
                                    onClick={() => {
                                        logout();
                                        closeMobileMenu();
                                    }}
                                    className="w-full text-center text-red-500 py-2 rounded-full text-sm font-medium hover:bg-red-50 transition-colors"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <Link
                                href="/login"
                                onClick={closeMobileMenu}
                                className="block w-full text-center bg-secondary text-white py-2 rounded-full text-sm font-medium hover:bg-secondary/90 transition-colors"
                            >
                                Sign In
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}