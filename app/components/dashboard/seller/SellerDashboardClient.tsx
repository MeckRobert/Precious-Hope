 'use client';

import { useState, useEffect } from 'react';
import {
  Store,
  Plus,
  TrendingUp,
  DollarSign,
  PenSquare,
  Trash2,
  Book,
  Mic,
  FileText,
  Loader2,
} from 'lucide-react';
import ProductForm, {
  ProductData,
  ProductType,
  BookCategory,
} from '../ProductForm';
import { useCurrency } from '../../../context/CurrencyContext';
import { useAuth } from '../../../context/AuthContext';
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../../../actions/product';

type Props = {
  sessionName: string;
};

export default function SellerDashboardClient({ sessionName }: Props) {
  const { user } = useAuth();
  const [products, setProducts] = useState<ProductData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { formatPrice } = useCurrency();

  const fetchSellerProducts = async () => {
    if (!user?.id) return;
    setIsLoading(true);
    try {
      const fetched = await getProducts({ sellerId: user.id });
      const mapped: ProductData[] = fetched.map((p) => ({
        id: p.id,
        title: p.title,
        author: p.seller.profile?.name || 'Unknown',
        price: p.price.toString(),
        type: p.type.toLowerCase() as ProductType,
        category: p.category
          ? (p.category.replace(/_/g, ' ') as BookCategory)
          : undefined,
        fileUrl: p.fileUrl || undefined,
      }));
      setProducts(mapped);
    } catch (err) {
      console.error(err);
      setError('Failed to load products');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSellerProducts();
  }, [user?.id]);

  const handleAdd = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  const handleEdit = (product: ProductData) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const result = await deleteProduct(id, user!.id);
      if (result.success) {
        fetchSellerProducts();
      } else {
        alert('Failed to delete product: ' + result.error);
      }
    } catch (e) {
      alert('Error deleting product');
    }
  };

  const handleFormSubmit = async (data: ProductData) => {
    if (!user?.id) return;

    try {
      const payload = {
        title: data.title,
        description: data.description,
        price: parseFloat(data.price),
        type: data.type.toUpperCase() as any,
        category: data.category
          ? (data.category.replace(/ /g, '_') as any)
          : undefined,
        fileUrl: data.fileUrl,
      };

      if (editingProduct && editingProduct.id) {
        const result = await updateProduct(editingProduct.id, user.id, payload);
        if (!result.success) throw new Error(result.error);
      } else {
        const result = await createProduct(user.id, payload);
        if (!result.success) throw new Error(result.error);
      }

      setIsFormOpen(false);
      fetchSellerProducts();
    } catch (err) {
      alert('Failed to save product');
      console.error(err);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'book':
        return <Book className="w-6 h-6" />;
      case 'sermon':
        return <Mic className="w-6 h-6" />;
      case 'article':
        return <FileText className="w-6 h-6" />;
      default:
        return <Book className="w-6 h-6" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'book':
        return 'bg-blue-400';
      case 'sermon':
        return 'bg-purple-400';
      case 'article':
        return 'bg-amber-400';
      default:
        return 'bg-slate-400';
    }
  };

  if (isLoading && products.length === 0) {
    return (
      <div className="p-12 text-center">
        <Loader2 className="animate-spin inline-block text-primary" />
      </div>
    );
  }

  return (
    <div className="p-6 relative">
      <h2 className="text-xl font-bold text-secondary mb-6 flex items-center gap-2">
        <Store className="w-5 h-5" /> Seller Hub
      </h2>
      <p className="mt-1 text-sm text-gray-600">Welcome back, {sessionName}</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-50 text-green-600 rounded-lg">
              <DollarSign className="w-5 h-5" />
            </div>
            <span className="text-sm font-medium text-slate-500">
              Total Earnings
            </span>
          </div>
          <p className="text-2xl font-bold text-secondary">
            {formatPrice(0)}
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <Plus className="w-5 h-5" />
            </div>
            <span className="text-sm font-medium text-slate-500">
              Products
            </span>
          </div>
          <p className="text-2xl font-bold text-secondary">
            {products.length}
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
              <TrendingUp className="w-5 h-5" />
            </div>
            <span className="text-sm font-medium text-slate-500">
              Sales This Month
            </span>
          </div>
          <p className="text-2xl font-bold text-secondary">0</p>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-secondary">My Products</h3>
      </div>

      <div className="space-y-4">
        {products.length === 0 ? (
          <div className="text-center py-12 bg-slate-50 rounded-lg border border-dashed border-slate-300">
            <p className="text-slate-500">
              No products found. Start adding some!
            </p>
          </div>
        ) : (
          products.map((product) => (
            <div
              key={product.id}
              className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-100 hover:border-slate-200 transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-md flex items-center justify-center border border-slate-200 text-slate-400">
                  {getTypeIcon(product.type)}
                </div>
                <div>
                  <p className="font-bold text-secondary">{product.title}</p>
                  <div className="flex items-center gap-2 flex-wrap text-xs text-slate-500 capitalize">
                    <span
                      className={`inline-block w-2 h-2 rounded-full ${getTypeColor(
                        product.type
                      )}`}
                    ></span>
                    <span>{product.type}</span>
                    {product.type === 'book' && product.category && (
                      <>
                        <span>•</span>
                        <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                          {product.category}
                        </span>
                      </>
                    )}
                    <span>•</span>
                    <span>
                      {formatPrice(parseFloat(product.price))}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleEdit(product)}
                  className="p-2 text-slate-600 hover:bg-white hover:text-primary rounded-md transition-colors"
                  title="Edit"
                >
                  <PenSquare className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(product.id!)}
                  className="p-2 text-slate-600 hover:bg-white hover:text-red-500 rounded-md transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <button
        onClick={handleAdd}
        className="w-full mt-6 py-3 bg-secondary text-white font-bold rounded-lg hover:bg-secondary/90 transition-colors flex items-center justify-center gap-2"
      >
        <Plus className="w-5 h-5" /> Add New Product
      </button>

      {isFormOpen && (
        <ProductForm
          initialData={editingProduct}
          onSubmit={handleFormSubmit}
          onCancel={() => setIsFormOpen(false)}
        />
      )}
    </div>
  );
}
