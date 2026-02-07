import Link from 'next/link';
import { CheckCircle, Lock } from 'lucide-react';

export default function CheckoutPage() {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
                {/* Steps */}
                <div className="flex items-center justify-center mb-12">
                    <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold z-10">1</div>
                        <div className="hidden sm:block ml-3 font-bold text-primary">Information</div>
                    </div>
                    <div className="w-12 sm:w-24 h-0.5 bg-slate-200 mx-4"></div>
                    <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center font-bold z-10">2</div>
                        <div className="hidden sm:block ml-3 font-medium text-slate-500">Shipping</div>
                    </div>
                    <div className="w-12 sm:w-24 h-0.5 bg-slate-200 mx-4"></div>
                    <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center font-bold z-10">3</div>
                        <div className="hidden sm:block ml-3 font-medium text-slate-500">Payment</div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Form */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-xl font-bold text-secondary mb-4">Contact Information</h2>
                            <input type="email" placeholder="Email address" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:border-primary transition-colors" />
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-secondary mb-4">Shipping Address</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <input type="text" placeholder="First name" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:border-primary transition-colors" />
                                <input type="text" placeholder="Last name" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:border-primary transition-colors" />
                                <input type="text" placeholder="Address" className="col-span-2 w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:border-primary transition-colors" />
                                <input type="text" placeholder="City" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:border-primary transition-colors" />
                                <input type="text" placeholder="Zip code" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:border-primary transition-colors" />
                            </div>
                        </div>

                        <button className="w-full py-4 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors">
                            Continue to Shipping
                        </button>
                    </div>

                    {/* Summary Review */}
                    <div className="bg-slate-50 p-8 rounded-2xl h-fit">
                        <h3 className="text-lg font-bold text-secondary mb-6">Order Summary</h3>
                        <div className="space-y-4 divide-y divide-slate-200">
                            {[1, 2].map((item) => (
                                <div key={item} className="flex gap-4 py-4 first:pt-0">
                                    <div className="w-16 h-20 bg-white rounded-md border border-slate-200 relative">
                                        <span className="absolute -top-2 -right-2 w-5 h-5 bg-slate-500 text-white text-xs font-bold rounded-full flex items-center justify-center">1</span>
                                    </div>
                                    <div className="flex-grow">
                                        <h4 className="font-bold text-sm text-secondary">The Path to Wisdom</h4>
                                        <p className="text-xs text-slate-500">Sarah Cohen</p>
                                    </div>
                                    <div className="font-bold text-sm text-secondary">$24.99</div>
                                </div>
                            ))}
                        </div>

                        <div className="pt-6 mt-4 border-t border-slate-200 space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Subtotal</span>
                                <span className="font-bold text-secondary">$49.98</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Shipping</span>
                                <span className="text-xs text-slate-400">Calculated next step</span>
                            </div>
                        </div>

                        <div className="pt-6 mt-6 border-t border-slate-200 flex justify-between items-center">
                            <span className="font-bold text-lg text-secondary">Total</span>
                            <span className="font-bold text-2xl text-primary">$49.98</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
