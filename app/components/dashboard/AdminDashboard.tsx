import { Shield, Users, AlertTriangle, Activity } from 'lucide-react';

export default function AdminDashboard() {
    return (
        <div className="p-6">
            <h2 className="text-xl font-bold text-secondary mb-6 flex items-center gap-2">
                <Shield className="w-5 h-5" /> Admin Console
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-bold text-slate-500 uppercase">Total Users</span>
                        <Users className="w-4 h-4 text-slate-400" />
                    </div>
                    <p className="text-2xl font-bold text-secondary">10,245</p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-bold text-slate-500 uppercase">Active Sellers</span>
                        <StoreIcon className="w-4 h-4 text-slate-400" />
                    </div>
                    <p className="text-2xl font-bold text-secondary">452</p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-bold text-slate-500 uppercase">Reports</span>
                        <AlertTriangle className="w-4 h-4 text-amber-500" />
                    </div>
                    <p className="text-2xl font-bold text-secondary">12</p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-bold text-slate-500 uppercase">Site Health</span>
                        <Activity className="w-4 h-4 text-green-500" />
                    </div>
                    <p className="text-2xl font-bold text-secondary">98%</p>
                </div>
            </div>

            <h3 className="font-bold text-secondary mb-4">Recent Activity</h3>
            <div className="bg-slate-50 rounded-xl border border-slate-100 overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-slate-100 text-slate-500 font-medium border-b border-slate-200">
                        <tr>
                            <th className="px-4 py-3">User</th>
                            <th className="px-4 py-3">Action</th>
                            <th className="px-4 py-3">Time</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {[1, 2, 3, 4].map((i) => (
                            <tr key={i}>
                                <td className="px-4 py-3 font-medium text-secondary">User_{100 + i}</td>
                                <td className="px-4 py-3 text-slate-600">Registered as Seller</td>
                                <td className="px-4 py-3 text-slate-500">{i} hours ago</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function StoreIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
            <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
            <path d="M2 7h20" />
            <path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7" />
        </svg>
    )
}
