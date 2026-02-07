import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, BookOpen, Star, Heart } from 'lucide-react';

export default function Home() {
  return (
    <div className="space-y-24 pb-24">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-secondary overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-600 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm">
            <span className="text-primary font-medium text-sm tracking-wide">WELCOME TO PRECIOUS HOPE</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-8 leading-tight">
            Nourish Your Soul with <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-amber-200">Timeless Wisdom</span>
          </h1>
          <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
            Discover a curated collection of books and teachings designed to inspire, educate, and transform your journey.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/store" className="w-full sm:w-auto px-8 py-4 bg-primary text-white rounded-full font-bold hover:bg-primary/90 transition-all transform hover:-translate-y-1 shadow-lg shadow-primary/25">
              Explore Books
            </Link>
            <Link href="/teachings" className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full font-bold hover:bg-white/20 transition-all flex items-center justify-center gap-2">
              Latest Teachings <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Books Section */}
      <section className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-secondary mb-4">Featured Collections</h2>
            <p className="text-muted-foreground max-w-md">Hand-picked selections that have touched the lives of thousands of readers.</p>
          </div>
          <Link href="/store" className="hidden md:flex items-center text-primary font-bold hover:underline">
            View All Books <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>

        {/* Book Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="group relative bg-white rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100">
              <div className="relative aspect-[3/4] bg-slate-100 rounded-xl mb-6 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-slate-300">
                  <BookOpen className="w-12 h-12" />
                </div>
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  <button className="p-3 bg-white rounded-full text-secondary hover:text-primary transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300">
                    <Heart className="w-5 h-5" />
                  </button>
                  <button className="px-6 py-3 bg-primary text-white rounded-full font-bold transform translate-y-4 group-hover:translate-y-0 duration-300 delay-75">
                    View
                  </button>
                </div>
              </div>
              <h3 className="text-lg font-bold text-secondary mb-1">The Path to Wisdom</h3>
              <p className="text-sm text-muted-foreground mb-3">Author Name</p>
              <div className="flex items-center justify-between">
                <span className="text-primary font-bold text-lg">$24.99</span>
                <div className="flex items-center text-amber-400 text-sm">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="ml-1 text-slate-600">4.9</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link href="/store" className="inline-flex items-center text-primary font-bold">
            View All Books <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </section>

      {/* Latest Teachings Preview */}
      <section className="bg-slate-50 py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-secondary mb-4">Words of Encouragement</h2>
            <p className="text-muted-foreground">Dive into our latest articles and teachings designed to uplift your spirit and broaden your perspective.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <Link href={`/teachings/article-${item}`} key={item} className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-slate-100">
                <div className="aspect-video bg-slate-200 relative overflow-hidden">
                  <div className="absolute inset-0 bg-secondary/10 group-hover:scale-105 transition-transform duration-500"></div>
                </div>
                <div className="p-8">
                  <div className="text-xs font-bold text-primary uppercase tracking-wider mb-3">Spiritual Growth</div>
                  <h3 className="text-xl font-bold text-secondary mb-3 group-hover:text-primary transition-colors">Finding Peace in a Chaotic World</h3>
                  <p className="text-muted-foreground text-sm line-clamp-3 mb-6">
                    In today's fast-paced society, finding moments of silence can seem impossible. Here are five practical ways to cultivate inner peace...
                  </p>
                  <span className="text-sm font-medium text-secondary underline decoration-primary/30 group-hover:decoration-primary underline-offset-4 transition-all">Read Full Article</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="container mx-auto px-4">
        <div className="bg-secondary rounded-3xl p-8 md:p-16 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2"></div>
          </div>

          <div className="relative z-10 max-w-xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">Join Our Community</h2>
            <p className="text-slate-300 mb-8">Subscribe to get notified about new book releases, upcoming events, and weekly wisdom delivered straight to your inbox.</p>
            <form className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-grow px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-slate-400 focus:outline-none focus:border-primary backdrop-blur-sm"
              />
              <button type="submit" className="px-8 py-4 bg-primary text-white font-bold rounded-full hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
