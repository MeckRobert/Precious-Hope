'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { BookOpen, Star, ShoppingCart, Truck, RefreshCw, ShieldCheck, ArrowLeft, Heart, Loader2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { getProduct, toggleLike } from '../../actions/product';
import { useCurrency } from '../../context/CurrencyContext';

export default function BookDetailsPage({ params }: { params: { id: string } }) {
    const { addToCart } = useCart();
    const { user } = useAuth();
    const { formatPrice } = useCurrency();

    const [book, setBook] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProduct = async () => {
            setLoading(true);
            const data = await getProduct(params.id, user?.id);
            if (data) setBook(data);
            setLoading(false);
        };
        loadProduct();
    }, [params.id, user?.id]);

    const handleAddToCart = () => {
        if (!book) return;
        addToCart({
            id: book.id,
            name: book.title, // Fixed to use title key as per context
            price: book.price,
            quantity: 1

        });
    };

    const handleLike = async () => {
        if (!user) {
            alert("Please login to like products");
            return;
        }
        if (!book) return;

        // Optimistic
        setBook((prev: any) => ({
            ...prev,
            isLiked: !prev.isLiked,
            likesCount: (prev.likesCount || 0) + (prev.isLiked ? -1 : 1)
        }));

        await toggleLike(book.id, user.id);
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-primary w-8 h-8" /></div>;
    }

    if (!book) {
        return <div className="min-h-screen flex items-center justify-center text-slate-500">Product not found</div>;
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <Link href="/store" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Store
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 mb-24">
                {/* Product Image */}
                <div className="bg-slate-100 rounded-3xl aspect-[3/4] md:aspect-square flex items-center justify-center shadow-inner relative">
                    <BookOpen className="w-32 h-32 md:w-48 md:h-48 text-slate-300" />
                    <button
                        onClick={handleLike}
                        className={`absolute top-6 right-6 p-3 rounded-full bg-white shadow-lg transition-colors ${book.isLiked ? 'text-red-500' : 'text-slate-400 hover:text-red-500'}`}
                    >
                        <Heart className={`w-6 h-6 ${book.isLiked ? 'fill-current' : ''}`} />
                    </button>
                </div>

                {/* Product Info */}
                <div className="flex flex-col justify-center">
                    <div className="inline-flex items-center gap-2 mb-4">
                        <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full uppercase tracking-wide">
                            {book.category ? book.category.replace(/_/g, ' ') : book.type}
                        </span>
                        <div className="flex items-center text-amber-500 text-sm">
                            <Star className="w-4 h-4 fill-current" />
                            <span className="ml-1 font-medium text-slate-700">4.9 (120 reviews)</span>
                        </div>
                        <div className="text-sm font-medium text-slate-400">
                            {book.likesCount} Likes
                        </div>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-secondary mb-2">{book.title}</h1>
                    <p className="text-lg text-slate-500 mb-6">by <span className="text-secondary font-medium">{book.author || book.seller?.profile?.name || 'Unknown'}</span></p>

                    <div className="text-3xl font-bold text-primary mb-8">{formatPrice(book.price)}</div>

                    <p className="text-slate-600 leading-relaxed mb-8">
                        {book.description || "No description available."}
                    </p>

                    {book.fileUrl && (
                        <div className="mb-8 p-4 bg-blue-50 text-blue-800 rounded-lg text-sm">
                            Currently available as a digital download.
                        </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-4 mb-12">
                        <button
                            onClick={handleAddToCart}
                            className="flex-1 px-8 py-4 bg-primary text-white font-bold rounded-full hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 flex items-center justify-center gap-2"
                        >
                            <ShoppingCart className="w-5 h-5" /> Add to Cart
                        </button>
                        <button className="flex-1 px-8 py-4 bg-white border border-slate-200 text-secondary font-bold rounded-full hover:bg-slate-50 transition-all hover:border-slate-300">
                            Buy Now
                        </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-slate-100">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-slate-50 rounded-full text-slate-400"><Truck className="w-5 h-5" /></div>
                            <span className="text-xs font-medium text-slate-600">Free Shipping</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-slate-50 rounded-full text-slate-400"><RefreshCw className="w-5 h-5" /></div>
                            <span className="text-xs font-medium text-slate-600">30 Day Returns</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-slate-50 rounded-full text-slate-400"><ShieldCheck className="w-5 h-5" /></div>
                            <span className="text-xs font-medium text-slate-600">Secure Payment</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recommended / Related - Still mock for now as we don't have enough data logic yet */}
            <div>
                <h2 className="text-2xl font-serif font-bold text-secondary mb-8">You Might Also Like</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map((item) => (
                        <div key={item} className="group cursor-pointer">
                            <div className="aspect-[3/4] bg-slate-100 rounded-xl mb-4 flex items-center justify-center overflow-hidden">
                                <BookOpen className="w-12 h-12 text-slate-300 group-hover:scale-110 transition-transform duration-300" />
                            </div>
                            <h3 className="font-bold text-secondary group-hover:text-primary transition-colors">Related Book {item}</h3>
                            <p className="text-sm text-primary font-medium">$19.99</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
