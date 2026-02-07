import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export type ProductType = 'book' | 'sermon' | 'article';

export type BookCategory =
    | 'Spiritual Growth'
    | 'Theology'
    | 'Relationship and Marriage'
    | 'Children\'s Books'
    | 'Biographies'
    | 'Other';

export interface ProductData {
    id?: string;
    title: string;
    author: string;
    price: string;
    type: ProductType;
    category?: BookCategory;
    description: string;
    fileUrl?: string; // Added fileUrl
}

interface ProductFormProps {
    initialData?: ProductData | null;
    onSubmit: (data: ProductData) => void;
    onCancel: () => void;
}

export default function ProductForm({ initialData, onSubmit, onCancel }: ProductFormProps) {
    const [formData, setFormData] = useState<ProductData>({
        title: '',
        author: '',
        price: '',
        type: 'book',
        category: 'Spiritual Growth',
        description: ''
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl animation-fade-in max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between p-6 border-b border-slate-100">
                    <h2 className="text-xl font-bold text-secondary">
                        {initialData ? 'Edit Product' : 'Add New Product'}
                    </h2>
                    <button
                        onClick={onCancel}
                        className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {/* Type Selection */}
                    <div>
                        <label className="block text-sm font-medium text-secondary mb-2">Product Type</label>
                        <div className="flex gap-2 sm:gap-4 overflow-x-auto pb-2">
                            <label className="flex items-center gap-2 cursor-pointer border border-slate-200 p-3 rounded-lg hover:bg-slate-50 flex-grow min-w-[100px] has-[:checked]:border-primary has-[:checked]:bg-primary/5 transition-colors">
                                <input
                                    type="radio"
                                    name="type"
                                    value="book"
                                    checked={formData.type === 'book'}
                                    onChange={(e) => setFormData({ ...formData, type: 'book' })}
                                    className="text-primary focus:ring-primary"
                                />
                                <span className="font-medium text-secondary text-sm">Book</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer border border-slate-200 p-3 rounded-lg hover:bg-slate-50 flex-grow min-w-[100px] has-[:checked]:border-primary has-[:checked]:bg-primary/5 transition-colors">
                                <input
                                    type="radio"
                                    name="type"
                                    value="sermon"
                                    checked={formData.type === 'sermon'}
                                    onChange={(e) => setFormData({ ...formData, type: 'sermon' })}
                                    className="text-primary focus:ring-primary"
                                />
                                <span className="font-medium text-secondary text-sm">Sermon</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer border border-slate-200 p-3 rounded-lg hover:bg-slate-50 flex-grow min-w-[100px] has-[:checked]:border-primary has-[:checked]:bg-primary/5 transition-colors">
                                <input
                                    type="radio"
                                    name="type"
                                    value="article"
                                    checked={formData.type === 'article'}
                                    onChange={(e) => setFormData({ ...formData, type: 'article' })}
                                    className="text-primary focus:ring-primary"
                                />
                                <span className="font-medium text-secondary text-sm">Article</span>
                            </label>
                        </div>
                    </div>

                    {/* Category Selection - Only for Books */}
                    {formData.type === 'book' && (
                        <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                            <label className="block text-sm font-medium text-secondary mb-1">Book Category</label>
                            <select
                                className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-primary transition-colors bg-white"
                                value={formData.category || 'Spiritual Growth'}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value as BookCategory })}
                            >
                                <option value="Spiritual Growth">Spiritual Growth</option>
                                <option value="Theology">Theology</option>
                                <option value="Relationship and Marriage">Relationship and Marriage</option>
                                <option value="Children's Books">Children's Books</option>
                                <option value="Biographies">Biographies</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-secondary mb-1">Title</label>
                        <input
                            type="text"
                            required
                            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-primary transition-colors"
                            placeholder={formData.type === 'book' ? "The Path to Wisdom" : "Grace Overflowing - Part 1"}
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-secondary mb-1">
                            {formData.type === 'book' ? 'Author' : 'Preacher / Speaker'}
                        </label>
                        <input
                            type="text"
                            required
                            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-primary transition-colors"
                            placeholder={formData.type === 'book' ? "Sarah Cohen" : "Rev. James Smith"}
                            value={formData.author}
                            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-secondary mb-1">Price ($)</label>
                        <input
                            type="number"
                            step="0.01"
                            required
                            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-primary transition-colors"
                            placeholder="24.99"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-secondary mb-1">
                            File Download URL (PDF/Audio)
                        </label>
                        <input
                            type="url"
                            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-primary transition-colors"
                            placeholder="https://example.com/file.pdf"
                            value={(formData as any).fileUrl || ''}
                            onChange={(e) => setFormData({ ...formData, fileUrl: e.target.value } as any)}
                        />
                        <p className="text-xs text-slate-500 mt-1">Provide a direct link to the content (Google Drive, Dropbox, etc.)</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-secondary mb-1">Description</label>
                        <textarea
                            rows={4}
                            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-primary transition-colors resize-none"
                            placeholder="Enter a brief description..."
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>

                    <div className="pt-4 flex gap-3">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="flex-1 py-3 border border-slate-200 text-slate-600 font-bold rounded-lg hover:bg-slate-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
                        >
                            {initialData ? 'Update Product' : 'Add Product'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
