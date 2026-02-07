import Link from 'next/link';
import { Trash2, ArrowRight, Minus, Plus, ShoppingBag } from 'lucide-react';

export default function CartPage() {
    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-3xl font-serif font-bold text-secondary mb-8">Your Cart (2 items)</h1>

            <div className="flex flex-col lg:flex-row gap-12">
                {/* Cart Items */}
                <div className="flex-grow space-y-6">
                    {[1, 2].map((item) => (
                        <div key={item} className="flex flex-col sm:flex-row gap-6 p-6 bg-white border border-slate-100 rounded-2xl shadow-sm">
                            <div className="w-full sm:w-24 aspect-[3/4] bg-slate-100 rounded-lg flex-shrink-0"></div>

                            <div className="flex-grow">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-lg font-bold text-secondary">The Path to Wisdom</h3>
                                    <span className="text-lg font-bold text-primary">$24.99</span>
                                </div>
                                <p className="text-sm text-slate-500 mb-4">Sarah Cohen</p>

                                <div className="flex items-center justify-between mt-auto">
                                    <div className="flex items-center border border-slate-200 rounded-lg">
                                        <button className="p-2 hover:bg-slate-50 text-slate-400 hover:text-secondary transition-colors"><Minus className="w-4 h-4" /></button>
                                        <span className="w-8 text-center text-sm font-medium">1</span>
                                        <button className="p-2 hover:bg-slate-50 text-slate-400 hover:text-secondary transition-colors"><Plus className="w-4 h-4" /></button>
                                    </div>

                                    <button className="text-red-400 hover:text-red-600 transition-colors flex items-center gap-1 text-sm font-medium">
                                        <Trash2 className="w-4 h-4" /> Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="flex items-center gap-2 text-primary font-medium p-4 bg-primary/5 rounded-xl border border-primary/10">
                        <ShoppingBag className="w-5 h-5" />
                        <span>You're $5.02 away from Free Shipping!</span>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="w-full lg:w-96 flex-shrink-0">
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 sticky top-24">
                        <h3 className="text-xl font-bold text-secondary mb-6">Order Summary</h3>

                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between text-slate-600">
                                <span>Subtotal</span>
                                <span>$49.98</span>
                            </div>
                            <div className="flex justify-between text-slate-600">
                                <span>Shipping</span>
                                <span>$5.00</span>
                            </div>
                            <div className="flex justify-between text-slate-600">
                                <span>Tax</span>
                                <span>$4.00</span>
                            </div>
                            <div className="pt-4 border-t border-slate-100 flex justify-between font-bold text-lg text-secondary">
                                <span>Total</span>
                                <span>$58.98</span>
                            </div>
                        </div>

                        <Link href="/checkout" className="block w-full py-4 bg-secondary text-white text-center font-bold rounded-full hover:bg-secondary/90 transition-colors shadow-lg shadow-secondary/10 mb-4">
                            Proceed to Checkout
                        </Link>

                        <Link href="/store" className="block w-full text-center text-sm text-slate-500 hover:text-primary transition-colors">
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
