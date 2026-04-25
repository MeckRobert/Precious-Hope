'use client';

import { useState, useEffect, useRef } from 'react';
import { X, Upload, FileText, FileAudio, FileVideo, XCircle } from 'lucide-react';

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
    fileUrl?: string;
    fileName?: string;
    fileType?: string;
    fileSize?: number;
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
        description: '',
        fileUrl: '',
        fileName: '',
        fileType: '',
        fileSize: 0
    });

    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    // Cleanup object URLs on unmount
    useEffect(() => {
        return () => {
            if (formData.fileUrl && formData.fileUrl.startsWith('blob:')) {
                URL.revokeObjectURL(formData.fileUrl);
            }
        };
    }, [formData.fileUrl]);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        // Validate file type based on product type
        const validTypes: Record<ProductType, string[]> = {
            book: ['application/pdf'],
            sermon: ['audio/mpeg', 'audio/wav', 'audio/mp4', 'video/mp4', 'video/webm'],
            article: ['application/pdf', 'text/html', 'text/plain']
        };

        const allowedTypes = validTypes[formData.type];
        if (!allowedTypes.includes(file.type)) {
            alert(`Invalid file type. Allowed formats: ${allowedTypes.join(', ')}`);
            return;
        }

        // Validate file size (max 100MB)
        const maxSize = 100 * 1024 * 1024; // 100MB
        if (file.size > maxSize) {
            alert('File size must be less than 100MB');
            return;
        }

        setIsUploading(true);
        setUploadProgress(0);

        // Simulate upload progress
        const interval = setInterval(() => {
            setUploadProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + 10;
            });
        }, 200);

        // Create local URL for the file
        const localUrl = URL.createObjectURL(file);

        setTimeout(() => {
            setFormData({
                ...formData,
                fileUrl: localUrl,
                fileName: file.name,
                fileType: file.type,
                fileSize: file.size
            });
            setIsUploading(false);
            setUploadProgress(100);
            clearInterval(interval);

            // Reset file input
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }, 2000);
    };

    const removeFile = () => {
        if (formData.fileUrl && formData.fileUrl.startsWith('blob:')) {
            URL.revokeObjectURL(formData.fileUrl);
        }
        setFormData({
            ...formData,
            fileUrl: '',
            fileName: '',
            fileType: '',
            fileSize: 0
        });
    };

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const getFileIcon = () => {
        if (!formData.fileType) return <FileText className="w-8 h-8 text-slate-400" />;
        
        if (formData.fileType.includes('pdf')) {
            return <FileText className="w-8 h-8 text-red-500" />;
        } else if (formData.fileType.includes('audio')) {
            return <FileAudio className="w-8 h-8 text-green-500" />;
        } else if (formData.fileType.includes('video')) {
            return <FileVideo className="w-8 h-8 text-blue-500" />;
        }
        return <FileText className="w-8 h-8 text-slate-400" />;
    };

    const getFileTypeLabel = () => {
        if (!formData.fileType) return '';
        
        if (formData.fileType.includes('pdf')) return 'PDF Document';
        if (formData.fileType.includes('audio')) return 'Audio File';
        if (formData.fileType.includes('video')) return 'Video File';
        return 'File';
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Validate file upload based on product type
        if (formData.type === 'book' && !formData.fileUrl) {
            alert('Please upload a PDF file for the book');
            return;
        }
        if (formData.type === 'sermon' && !formData.fileUrl) {
            alert('Please upload an audio or video file for the sermon');
            return;
        }
        if (formData.type === 'article' && !formData.fileUrl) {
            alert('Please upload a file for the article');
            return;
        }
        
        onSubmit(formData);
    };

    const getUploadPrompt = () => {
        switch (formData.type) {
            case 'book':
                return 'Upload PDF (Max 100MB)';
            case 'sermon':
                return 'Upload Audio/Video (MP3, WAV, MP4, WebM - Max 100MB)';
            case 'article':
                return 'Upload PDF, HTML, or Text (Max 100MB)';
            default:
                return 'Upload File (Max 100MB)';
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl animation-fade-in max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between p-6 border-b border-slate-100 sticky top-0 bg-white z-10">
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
                            {(['book', 'sermon', 'article'] as ProductType[]).map((type) => (
                                <label
                                    key={type}
                                    className={`flex items-center gap-2 cursor-pointer border p-3 rounded-lg hover:bg-slate-50 flex-grow min-w-[100px] transition-colors ${
                                        formData.type === type
                                            ? 'border-primary bg-primary/5'
                                            : 'border-slate-200'
                                    }`}
                                >
                                    <input
                                        type="radio"
                                        name="type"
                                        value={type}
                                        checked={formData.type === type}
                                        onChange={() => {
                                            removeFile();
                                            setFormData({ ...formData, type, fileUrl: '', fileName: '', fileType: '', fileSize: 0 });
                                        }}
                                        className="text-primary focus:ring-primary"
                                    />
                                    <span className="font-medium text-secondary text-sm capitalize">{type}</span>
                                </label>
                            ))}
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

                    {/* File Upload Section */}
                    <div>
                        <label className="block text-sm font-medium text-secondary mb-1">
                            {formData.type === 'book' ? 'Upload Book (PDF)' : formData.type === 'sermon' ? 'Upload Sermon (Audio/Video)' : 'Upload Article'}
                        </label>
                        
                        {isUploading ? (
                            <div className="border-2 border-dashed border-primary rounded-lg p-6 text-center bg-primary/5">
                                <div className="flex flex-col items-center gap-3">
                                    <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                                    <p className="text-sm font-medium text-primary">Uploading... {uploadProgress}%</p>
                                    <div className="w-full max-w-xs h-2 bg-primary/20 rounded-full overflow-hidden">
                                        <div 
                                            className="h-full bg-primary rounded-full transition-all duration-300"
                                            style={{ width: `${uploadProgress}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        ) : formData.fileUrl ? (
                            <div className="border-2 border-primary rounded-lg p-4 bg-primary/5">
                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0">
                                        {getFileIcon()}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-secondary truncate">{formData.fileName}</p>
                                        <div className="flex flex-wrap gap-2 mt-1">
                                            <span className="text-xs text-slate-500">{getFileTypeLabel()}</span>
                                            <span className="text-xs text-slate-400">•</span>
                                            <span className="text-xs text-slate-500">{formatFileSize(formData.fileSize || 0)}</span>
                                        </div>
                                        {/* Audio Preview */}
                                        {formData.fileType?.includes('audio') && (
                                            <div className="mt-3">
                                                <audio controls className="w-full h-10">
                                                    <source src={formData.fileUrl} type={formData.fileType} />
                                                    Your browser does not support the audio element.
                                                </audio>
                                            </div>
                                        )}
                                        {/* Video Preview */}
                                        {formData.fileType?.includes('video') && (
                                            <div className="mt-3">
                                                <video controls className="w-full rounded-lg max-h-32">
                                                    <source src={formData.fileUrl} type={formData.fileType} />
                                                    Your browser does not support the video element.
                                                </video>
                                            </div>
                                        )}
                                        {/* PDF Preview Link */}
                                        {formData.fileType?.includes('pdf') && (
                                            <a
                                                href={formData.fileUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-2"
                                            >
                                                Preview PDF →
                                            </a>
                                        )}
                                    </div>
                                    <button
                                        type="button"
                                        onClick={removeFile}
                                        className="p-1 text-slate-400 hover:text-red-500 transition-colors flex-shrink-0"
                                    >
                                        <XCircle className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className="border-2 border-dashed border-slate-200 rounded-lg p-8 text-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-all group"
                            >
                                <Upload className="w-10 h-10 mx-auto text-slate-400 group-hover:text-primary transition-colors mb-3" />
                                <p className="text-slate-600 font-medium mb-1">Click to upload file</p>
                                <p className="text-xs text-slate-500">{getUploadPrompt()}</p>
                            </div>
                        )}
                        
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept={
                                formData.type === 'book' 
                                    ? '.pdf' 
                                    : formData.type === 'sermon' 
                                        ? '.mp3,.wav,.m4a,.mp4,.webm' 
                                        : '.pdf,.html,.txt'
                            }
                            onChange={handleFileUpload}
                            className="hidden"
                        />
                        
                        <p className="text-xs text-slate-500 mt-2">
                            📁 Upload files directly from your device. Files are stored locally in your browser.
                        </p>
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