'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BookOpen, Search, Star, Filter, ShoppingCart, Loader2, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import { useAuth } from '../context/AuthContext';
import { getProducts, toggleLike } from '../actions/product';

const categories = ["All Books", "Relationship and Marriage","Spiritual Growth", "Theology", "Biographies", 
    "Children's Books"];

// Define type based on what getProducts returns or common type
type Product = {
    id: string;
    title: string;
    author?: string; // We might need to map seller name to author or add author field to product
    price: number;
    category: string | null;
    rating?: number; // Not in DB yet, will mock or default
    likesCount?: number;
    isLiked?: boolean;
    seller?: {
        profile?: {
            name: string;
        } | null;
    };
};

export default function StorePage() {
    const { user } = useAuth();
    const [selectedCategory, setSelectedCategory] = useState("All Books");
    const [searchQuery, setSearchQuery] = useState("");
    const { addToCart } = useCart();
    const { formatPrice, isLoading: isCurrencyLoading } = useCurrency();

    // DB Data state
    const [products, setProducts] = useState<Product[]>([]);
    const [isProductsLoading, setIsProductsLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            setIsProductsLoading(true);
            try {
                const fetched = await getProducts({
                    category: selectedCategory,
                    search: searchQuery,
                    userId: user?.id
                });
                setProducts(fetched as any);
            } catch (error) {
                console.error("Error fetching products", error);
            } finally {
                setIsProductsLoading(false);
            }
        };

        // Debounce search slightly
        const timeout = setTimeout(() => {
            fetchProducts();
        }, 300);

        return () => clearTimeout(timeout);
    }, [selectedCategory, searchQuery, user?.id]);

    const handleLike = async (e: React.MouseEvent, productId: string) => {
        e.preventDefault(); // Prevent link click
        e.stopPropagation();

        if (!user) {
            alert("Please login to like products");
            return;
        }

        // Optimistic update
        setProducts(prev => prev.map(p => {
            if (p.id === productId) {
                return {
                    ...p,
                    isLiked: !p.isLiked,
                    likesCount: (p.likesCount || 0) + (p.isLiked ? -1 : 1)
                };
            }
            return p;
        }));

        await toggleLike(productId, user.id);
    };

    const isLoading = isCurrencyLoading || isProductsLoading;

    if (isLoading && products.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="animate-spin w-8 h-8 text-primary" />
            </div>
        );
    }

    return (
        <div className="bg-slate-50 min-h-screen pb-20">
            {/* Header */}
            <div className="bg-secondary text-white py-12 px-4 shadow-md">
                <div className="container mx-auto max-w-6xl">
                    <h1 className="text-4xl font-serif font-bold mb-4">The Bookstore</h1>
                    <p className="text-slate-300 max-w-2xl">Explore our curated collection of wisdom, theology, and spiritual growth resources.</p>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto max-w-6xl px-4 py-8 flex flex-col md:flex-row gap-8">

                {/* Filters Sidebar */}
                <div className="w-full md:w-64 flex-shrink-0">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 sticky top-24">
                        <div className="flex items-center gap-2 mb-4 text-secondary font-bold">
                            <Filter className="w-5 h-5" />
                            <h2>Categories</h2>
                        </div>
                        <ul className="space-y-2">
                            {categories.map((category) => (
                                <li key={category}>
                                    <button
                                        onClick={() => setSelectedCategory(category)}
                                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-sm ${selectedCategory === category
                                            ? 'bg-primary text-white font-bold'
                                            : 'text-slate-600 hover:bg-slate-50'
                                            }`}
                                    >
                                        {category}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Product Grid */}
                <div className="flex-1">
                    {/* Search Bar */}
                    <div className="relative mb-8">
                        <input
                            type="text"
                            placeholder="Search books, authors, or topics..."
                            className="w-full pl-12 pr-4 py-4 rounded-xl border-none shadow-sm focus:ring-2 focus:ring-primary/20 outline-none text-lg"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map((book) => (
                            <div key={book.id} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow group flex flex-col">
                                <div className="h-48 bg-slate-200 relative overflow-hidden">
                                    {/* Placeholder Book Cover */}
                                    <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                                        <BookOpen className="w-12 h-12 opacity-50" />
                                    </div>
                                </div>
                                <div className="p-5 flex-grow flex flex-col">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-xs font-bold text-primary uppercase tracking-wider">{book.category || 'General'}</span>
                                        <div className="flex items-center gap-3 text-xs font-bold">
                                            <button
                                                onClick={(e) => handleLike(e, book.id)}
                                                className={`flex items-center gap-1 transition-colors ${book.isLiked ? 'text-red-500' : 'text-slate-400 hover:text-red-500'}`}
                                            >
                                                <Heart className={`w-4 h-4 ${book.isLiked ? 'fill-current' : ''}`} />
                                                <span>{book.likesCount || 0}</span>
                                            </button>
                                            <div className="flex items-center gap-1 text-amber-400">
                                                <Star className="w-3 h-3 fill-current" /> {book.rating || 5.0}
                                            </div>
                                        </div>
                                    </div>
                                    <h3 className="font-bold text-lg text-secondary mb-1 leading-tight group-hover:text-primary transition-colors">
                                        <Link href={`/store/${book.id}`}>{book.title}</Link>
                                    </h3>
                                    <p className="text-sm text-slate-500 mb-4">by {book.author || book.seller?.profile?.name || 'Unknown'}</p>

                                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-50">
                                        <span className="text-xl font-bold text-secondary">{formatPrice(book.price)}</span>
                                        <button
                                            onClick={() => addToCart({ id: book.id, name: book.title, price: book.price,quantity: 1})}
                                            className="p-2 bg-slate-100 text-secondary rounded-full hover:bg-primary hover:text-white transition-colors"
                                            title="Add to Cart"
                                        >
                                            <ShoppingCart className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="mt-12 flex justify-center gap-2">
                        {[1, 2, 3].map((page) => (
                            <button
                                key={page}
                                className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium transition-colors ${page === 1 ? 'bg-primary text-white' : 'bg-white border border-slate-200 text-slate-600 hover:border-primary hover:text-primary'}`}
                            >
                                {page}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
