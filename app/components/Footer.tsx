import Link from 'next/link';
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-secondary text-white pt-16 pb-8">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-serif font-bold">
                            Precious<span className="text-primary">Hope</span>
                        </h3>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Spreading wisdom and knowledge through carefully curated books and teachings. Empowering minds, one page at a time.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-slate-400 hover:text-primary transition-colors"><Facebook className="w-5 h-5" /></a>
                            <a href="#" className="text-slate-400 hover:text-primary transition-colors"><Twitter className="w-5 h-5" /></a>
                            <a href="#" className="text-slate-400 hover:text-primary transition-colors"><Instagram className="w-5 h-5" /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-bold mb-6">Quick Links</h4>
                        <ul className="space-y-3 text-sm text-slate-400">
                            <li><Link href="/store" className="hover:text-primary transition-colors">Shop Books</Link></li>
                            <li><Link href="/teachings" className="hover:text-primary transition-colors">Latest Teachings</Link></li>
                            <li><Link href="/events" className="hover:text-primary transition-colors">Upcoming Events</Link></li>
                            <li><Link href="/about" className="hover:text-primary transition-colors">Our Story</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="font-bold mb-6">Support</h4>
                        <ul className="space-y-3 text-sm text-slate-400">
                            <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
                            <li><Link href="/faq" className="hover:text-primary transition-colors">FAQs</Link></li>
                            <li><Link href="/shipping" className="hover:text-primary transition-colors">Shipping Info</Link></li>
                            <li><Link href="/returns" className="hover:text-primary transition-colors">Returns Policy</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="font-bold mb-6">Stay Inspired</h4>
                        <p className="text-sm text-slate-400 mb-4">Subscribe to receive updates on new arrivals and special offers.</p>
                        <form className="space-y-3">
                            <div className="relative">
                                <input
                                    type="email"
                                    placeholder="Your email address"
                                    className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2 pl-4 pr-10 hover:border-slate-600 focus:outline-none focus:border-primary text-sm transition-colors"
                                />
                                <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary">
                                    <Mail className="w-4 h-4" />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
                    <p>&copy; {new Date().getFullYear()} Precious Hope. All rights reserved @ 2026</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <Link href="/privacy" className="hover:text-slate-300">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-slate-300">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
