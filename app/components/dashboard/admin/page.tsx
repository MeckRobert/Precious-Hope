import { Package, Users, ShoppingBag, BarChart3, Settings, LogOut } from 'lucide-react';
import { getSession } from '@/lib/session-server';
import { redirect } from 'next/navigation';

export default async function AdminDashboard() {
  const session = await getSession();

  if (!session || session.role !== 'ADMIN') {
    redirect('/login');
  }

  // Mock statistics – replace with real data from your database
  const stats = {
    totalOrders: 128,
    totalProducts: 45,
    totalUsers: 342,
    revenue: 12450.99,
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-secondary flex items-center gap-2">
          <BarChart3 className="w-5 h-5" /> Admin Dashboard
        </h2>
        <p className="mt-1 text-sm text-gray-600">
          Welcome back, {session.name} (Administrator)
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Total Orders</p>
              <p className="text-2xl font-bold text-secondary">{stats.totalOrders}</p>
            </div>
            <Package className="w-8 h-8 text-primary opacity-80" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Products</p>
              <p className="text-2xl font-bold text-secondary">{stats.totalProducts}</p>
            </div>
            <ShoppingBag className="w-8 h-8 text-primary opacity-80" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Customers</p>
              <p className="text-2xl font-bold text-secondary">{stats.totalUsers}</p>
            </div>
            <Users className="w-8 h-8 text-primary opacity-80" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Revenue</p>
              <p className="text-2xl font-bold text-secondary">${stats.revenue.toLocaleString()}</p>
            </div>
            <BarChart3 className="w-8 h-8 text-primary opacity-80" />
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="mb-8">
        <h3 className="text-lg font-bold text-secondary mb-3 flex items-center gap-2">
          <Package className="w-4 h-4" /> Recent Orders
        </h3>
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {[
                { id: '#PH-8291', customer: 'John Doe', date: 'Apr 12, 2025', amount: 49.99, status: 'Processing' },
                { id: '#PH-8290', customer: 'Jane Smith', date: 'Apr 11, 2025', amount: 89.99, status: 'Shipped' },
                { id: '#PH-8289', customer: 'Mike Johnson', date: 'Apr 10, 2025', amount: 24.99, status: 'Delivered' },
              ].map((order) => (
                <tr key={order.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-secondary">{order.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{order.customer}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{order.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-secondary">${order.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                      order.status === 'Delivered' ? 'bg-green-50 text-green-600' :
                      order.status === 'Shipped' ? 'bg-blue-50 text-blue-600' :
                      'bg-amber-50 text-amber-600'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Admin Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <button className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors group">
          <div className="p-3 bg-primary/10 text-primary rounded-lg group-hover:bg-primary/20 transition-colors">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div className="text-left">
            <h3 className="font-bold text-secondary">Manage Products</h3>
            <p className="text-xs text-slate-500">Add, edit or remove products</p>
          </div>
        </button>

        <button className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors group">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-100 transition-colors">
            <Users className="w-6 h-6" />
          </div>
          <div className="text-left">
            <h3 className="font-bold text-secondary">Manage Users</h3>
            <p className="text-xs text-slate-500">View and manage customer accounts</p>
          </div>
        </button>

        <button className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors group">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-lg group-hover:bg-purple-100 transition-colors">
            <Package className="w-6 h-6" />
          </div>
          <div className="text-left">
            <h3 className="font-bold text-secondary">All Orders</h3>
            <p className="text-xs text-slate-500">View and update order status</p>
          </div>
        </button>

        <button className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors group">
          <div className="p-3 bg-slate-100 text-slate-600 rounded-lg group-hover:bg-slate-200 transition-colors">
            <Settings className="w-6 h-6" />
          </div>
          <div className="text-left">
            <h3 className="font-bold text-secondary">Settings</h3>
            <p className="text-xs text-slate-500">Configure store preferences</p>
          </div>
        </button>

        <button className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 hover:bg-red-50 transition-colors group">
          <div className="p-3 bg-red-50 text-red-500 rounded-lg group-hover:bg-red-100 transition-colors">
            <LogOut className="w-6 h-6" />
          </div>
          <div className="text-left">
            <h3 className="font-bold text-secondary">Logout</h3>
            <p className="text-xs text-slate-500">End admin session</p>
          </div>
        </button>
      </div>
    </div>
  );
}