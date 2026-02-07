import Link from 'next/link';
import { BookOpen, Heart, Users, Coffee } from 'lucide-react';

export default function AboutPage() {
    return (
        <div className="bg-slate-50 min-h-screen">
            {/* Hero Section */}
            <div className="bg-secondary text-white py-24 px-4 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-2xl translate-y-1/3 -translate-x-1/3"></div>

                <div className="container mx-auto max-w-4xl text-center relative z-10">
                    <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 tracking-tight">Our Story of Hope</h1>
                    <p className="text-xl md:text-2xl text-slate-200 leading-relaxed max-w-2xl mx-auto">
                        We are dedicated to spreading wisdom, faith, and knowledge through careful curation of life-changing resources.
                    </p>
                </div>
            </div>

            {/* Mission Section */}
            <div className="container mx-auto px-4 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-bold text-sm uppercase tracking-wide mb-6">
                            Our Mission
                        </div>
                        <h2 className="text-4xl font-serif font-bold text-secondary mb-6 leading-tight">
                            More than just a bookstore,<br />we are a sanctuary.
                        </h2>
                        <p className="text-slate-600 text-lg leading-relaxed mb-6">
                            Precious Hope started with a simple vision: to create a space where people could find resources that truly matter. In a world full of noise, we curate books, teachings, and articles that offer clarity, comfort, and spiritual growth.
                        </p>
                        <p className="text-slate-600 text-lg leading-relaxed">
                            Every item in our store is hand-picked to ensure it meets our standard of excellence and spiritual depth. We believe in the power of words to transform lives.
                        </p>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 bg-primary/20 rounded-3xl transform rotate-3 scale-105"></div>
                        <div className="relative bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="text-center p-6 bg-slate-50 rounded-2xl">
                                    <BookOpen className="w-10 h-10 text-primary mx-auto mb-3" />
                                    <h3 className="font-bold text-secondary text-lg">Curated<br />Books</h3>
                                </div>
                                <div className="text-center p-6 bg-slate-50 rounded-2xl">
                                    <Users className="w-10 h-10 text-secondary mx-auto mb-3" />
                                    <h3 className="font-bold text-secondary text-lg">Community<br />Focus</h3>
                                </div>
                                <div className="text-center p-6 bg-slate-50 rounded-2xl">
                                    <Coffee className="w-10 h-10 text-amber-600 mx-auto mb-3" />
                                    <h3 className="font-bold text-secondary text-lg">Peaceful<br />Reading</h3>
                                </div>
                                <div className="text-center p-6 bg-slate-50 rounded-2xl">
                                    <Heart className="w-10 h-10 text-red-500 mx-auto mb-3" />
                                    <h3 className="font-bold text-secondary text-lg">Faith<br />Driven</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Join Us CTA */}
            <div className="bg-white py-20 border-t border-slate-100">
                <div className="container mx-auto px-4 text-center max-w-2xl">
                    <h2 className="text-3xl font-serif font-bold text-secondary mb-6">Join Our Community</h2>
                    <p className="text-slate-600 mb-8">
                        Whether you are looking for wisdom, a community of like-minded individuals, or a place to share your own insights, Precious Hope is here for you.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/register" className="px-8 py-3 bg-secondary text-white font-bold rounded-full hover:bg-secondary/90 transition-colors">
                            Become a Member
                        </Link>
                        <Link href="/store" className="px-8 py-3 bg-white text-secondary font-bold rounded-full border border-slate-200 hover:bg-slate-50 transition-colors">
                            Browse Store
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
