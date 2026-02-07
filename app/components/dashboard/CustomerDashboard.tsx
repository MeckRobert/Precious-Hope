import { Package, Heart, Settings, Clock } from 'lucide-react';

export default function CustomerDashboard() {
    return (
        <div className="p-6">
            <h2 className="text-xl font-bold text-secondary mb-6 flex items-center gap-2">
                <Package className="w-5 h-5" /> My Orders
            </h2>

            <div className="space-y-4">
                {[1, 2].map((i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-100 hover:border-slate-200 transition-colors">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-white rounded-md shadow-sm">
                                <Package className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <p className="font-bold text-secondary">Order #PH-{7829 + i}</p>
                                <p className="text-xs text-slate-500 flex items-center gap-1">
                                    <Clock className="w-3 h-3" /> placed on Oct {10 + i}, 2024
                                </p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="font-bold text-secondary">$ {(24.99 * i).toFixed(2)}</p>
                            <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">Delivered</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <button className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors group">
                    <div className="p-3 bg-red-50 text-red-500 rounded-lg group-hover:bg-red-100 transition-colors">
                        <Heart className="w-6 h-6" />
                    </div>
                    <div className="text-left">
                        <h3 className="font-bold text-secondary">Wishlist</h3>
                        <p className="text-xs text-slate-500">4 items saved</p>
                    </div>
                </button>

                <button className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors group">
                    <div className="p-3 bg-slate-100 text-slate-600 rounded-lg group-hover:bg-slate-200 transition-colors">
                        <Settings className="w-6 h-6" />
                    </div>
                    <div className="text-left">
                        <h3 className="font-bold text-secondary">Account Settings</h3>
                        <p className="text-xs text-slate-500">Manage your profile</p>
                    </div>
                </button>
            </div>
        </div>
    );
}
