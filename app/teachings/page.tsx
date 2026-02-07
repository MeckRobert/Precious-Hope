import Link from 'next/link';
import { PlayCircle, FileText, Calendar, User, ArrowRight } from 'lucide-react';

export default function TeachingsPage() {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-secondary mb-6">Teachings & Wisdom</h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                    Explore our library of articles, sermons, and videos designed to deepen your understanding and strengthen your faith.
                </p>
            </div>

            {/* Featured Teaching */}
            <div className="mb-20">
                <div className="relative rounded-3xl overflow-hidden bg-secondary text-white shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary to-transparent z-10"></div>
                    {/* Placeholder for real image */}
                    <div className="absolute inset-0 bg-secondary/50"></div>

                    <div className="relative z-20 p-8 md:p-16 max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full text-primary text-xs font-bold uppercase tracking-wider mb-6">
                            <StarIcon /> Featured Article
                        </div>
                        <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6 leading-tight">Walking Through the Valley: Finding Hope in Dark Times</h2>
                        <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                            Life is full of peaks and valleys. In this deep dive, we explore how to maintain perspective and faith when the path ahead seems unclear.
                        </p>
                        <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400 mb-8">
                            <span className="flex items-center gap-2"><User className="w-4 h-4" /> Dr. John Smith</span>
                            <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> Oct 15, 2023</span>
                            <span className="flex items-center gap-2"><FileText className="w-4 h-4" /> 10 min read</span>
                        </div>
                        <Link href="/teachings/walking-through-the-valley" className="inline-flex items-center px-8 py-4 bg-primary text-white font-bold rounded-full hover:bg-primary/90 transition-colors">
                            Read Article <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Latest Teachings Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                    <Link href={`/teachings/article-${item}`} key={item} className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-xl transition-all duration-300">
                        <div className="relative aspect-video bg-slate-200 overflow-hidden">
                            <div className="absolute inset-0 flex items-center justify-center text-slate-400 bg-slate-100">
                                {item % 2 === 0 ? <PlayCircle className="w-12 h-12" /> : <FileText className="w-12 h-12" />}
                            </div>
                            <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors"></div>
                            <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur rounded-lg text-xs font-bold text-secondary shadow-sm">
                                {item % 2 === 0 ? 'Video' : 'Article'}
                            </div>
                        </div>

                        <div className="p-6 flex flex-col flex-grow">
                            <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                                <span className="text-primary font-bold uppercase tracking-wider">Theology</span>
                                <span>•</span>
                                <span>Oct {10 + item}, 2023</span>
                            </div>

                            <h3 className="text-xl font-bold text-secondary mb-3 group-hover:text-primary transition-colors">
                                The Meaning of True Community in a Digital Age
                            </h3>

                            <p className="text-muted-foreground text-sm line-clamp-3 mb-6 flex-grow">
                                How do we build authentic relationships when so much of our interaction happens behind screens? Let's explore the biblical foundation for community...
                            </p>

                            <div className="flex items-center text-sm font-medium text-secondary group-hover:scale-105 origin-left transition-transform">
                                Read More <ArrowRight className="w-4 h-4 ml-1 text-primary" />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Load More */}
            <div className="mt-16 text-center">
                <button className="px-8 py-3 bg-white border border-slate-200 text-secondary font-bold rounded-full hover:bg-slate-50 transition-colors">
                    Load More Teachings
                </button>
            </div>
        </div>
    );
}

function StarIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
        </svg>
    )
}
