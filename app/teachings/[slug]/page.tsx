import Link from 'next/link';
import { Calendar, User, Clock, Share2, ArrowLeft, Facebook, Twitter, Linkedin } from 'lucide-react';

export default function TeachingDetailsPage({ params }: { params: { slug: string } }) {
    return (
        <article className="pb-24">
            {/* Article Header */}
            <header className="bg-slate-50 py-16 md:py-24 border-b border-slate-200">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <Link href="/teachings" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Teachings
                    </Link>

                    <div className="flex items-center justify-center gap-2 mb-6">
                        <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full uppercase tracking-wide">Spiritual Growth</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-secondary mb-8 leading-tight">Walking Through the Valley: Finding Hope in Dark Times</h1>

                    <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-400">
                                <User className="w-4 h-4" />
                            </div>
                            <span className="font-medium text-secondary">Dr. John Smith</span>
                        </div>
                        <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                        <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> Oct 15, 2023</span>
                        <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                        <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> 10 min read</span>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 mt-[-4rem] max-w-5xl">
                {/* Main Image */}
                <div className="aspect-video bg-slate-800 rounded-3xl shadow-xl overflow-hidden mb-12 relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    {/* Placeholder */}
                    <div className="absolute inset-0 flex items-center justify-center text-white/20">
                        <span className="text-4xl font-serif italic">Feature Image</span>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Content Sidebar (Socials) */}
                    <aside className="hidden lg:flex flex-col gap-4 w-24 pt-8 sticky top-24 h-fit">
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest text-center mb-2">Share</div>
                        <button className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all">
                            <Facebook className="w-5 h-5" />
                        </button>
                        <button className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all">
                            <Twitter className="w-5 h-5" />
                        </button>
                        <button className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all">
                            <Linkedin className="w-5 h-5" />
                        </button>
                        <button className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all">
                            <Share2 className="w-5 h-5" />
                        </button>
                    </aside>

                    {/* Main Content */}
                    <div className="flex-grow max-w-3xl prose prose-lg prose-slate prose-headings:font-serif prose-headings:text-secondary prose-a:text-primary hover:prose-a:text-primary/80">
                        <p className="lead text-xl text-slate-600 mb-8">
                            In the journey of life, we all encounter seasons of darkness. The "valley" is a metaphor as old as time, representing those moments of struggle, grief, or uncertainty where the way forward seems lost.
                        </p>

                        <h2>The Nature of the Valley</h2>
                        <p>
                            It's important to recognize that valleys are a natural part of the landscape. Just as mountains cannot exist without valleys, our spiritual highs are often balanced by difficult lows. These low points are not necessarily signs of failure, but rather opportunities for profound growth.
                        </p>
                        <p>
                            When we find ourselves in these shadows, our first instinct is often to rush through them. We want the quick fix, the immediate exit. But there is wisdom in slowing down and asking: <em>"What is this season trying to teach me?"</em>
                        </p>

                        <blockquote>
                            "The deeper that sorrow carves into your being, the more joy you can contain." – Kahlil Gibran
                        </blockquote>

                        <h2>Three Steps to Navigate Darkness</h2>

                        <h3>1. Acknowledge the Reality</h3>
                        <p>
                            Denial only prolongs the journey. Admitting that things are hard, that you are hurting, or that you are afraid is the first step toward healing. In this honesty, you find the solid ground needed to take the next step.
                        </p>

                        <h3>2. Seek Companion</h3>
                        <p>
                            Shouldering the burden alone is a recipe for exhaustion. Whether it's a trusted friend, a mentor, or a community group, finding others to walk with you can lighten the load significantly.
                        </p>

                        <h3>3. Look for Small Lights</h3>
                        <p>
                            In total darkness, even a single candle can be seen for miles. Focus on small gratitudes, tiny victories, and moments of peace. These are the breadcrumbs that will lead you out.
                        </p>

                        <hr className="my-12 border-slate-200" />

                        <p className="text-sm text-slate-500 italic">
                            This article is part of our "Spiritual Resilience" series. If you found this helpful, consider sharing it with someone who might be going through a tough time.
                        </p>
                    </div>
                </div>
            </div>
        </article>
    );
}
