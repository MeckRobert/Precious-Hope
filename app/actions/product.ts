'use server';

import { PrismaClient, ProductType, ProductCategory } from '@prisma/client';

const prisma = new PrismaClient();

export type ProductData = {
    title: string;
    description: string;
    price: number;
    type: ProductType;
    category?: ProductCategory;
    coverImage?: string;
    fileUrl?: string;
};

export async function getProducts(filters?: {
    category?: string;
    search?: string;
    sellerId?: string;
    userId?: string; // To check if liked by user
}) {
    try {
        const where: any = {};

        if (filters?.category && filters.category !== 'All Books') {
            where.category = filters.category as ProductCategory;
        }

        if (filters?.search) {
            where.OR = [
                { title: { contains: filters.search, mode: 'insensitive' } },
                { description: { contains: filters.search, mode: 'insensitive' } },
            ];
        }

        if (filters?.sellerId) {
            where.sellerId = filters.sellerId;
        }

        const products = await prisma.product.findMany({
            where,
            include: {
                seller: {
                    include: { profile: true }
                },
                _count: {
                    select: { likes: true }
                },
                likes: filters?.userId ? {
                    where: { userId: filters.userId }
                } : false
            },
            orderBy: { createdAt: 'desc' }
        });

        // Convert Decimal to number for frontend and add isLiked
        return products.map(p => ({
            ...p,
            price: Number(p.price),
            likesCount: p._count.likes,
            isLiked: filters?.userId ? p.likes.length > 0 : false
        }));
    } catch (error) {
        console.error("Failed to fetch products:", error);
        return [];
    }
}

export async function toggleLike(productId: string, userId: string) {
    try {
        const existingLike = await prisma.like.findUnique({
            where: {
                userId_productId: {
                    userId,
                    productId
                }
            }
        });

        if (existingLike) {
            await prisma.like.delete({
                where: {
                    userId_productId: {
                        userId,
                        productId
                    }
                }
            });
            return { success: true, isLiked: false };
        } else {
            await prisma.like.create({
                data: {
                    userId,
                    productId
                }
            });
            return { success: true, isLiked: true };
        }
    } catch (error) {
        console.error("Failed to toggle like:", error);
        return { success: false, error: "Failed to like product" };
    }
}

export async function getProduct(id: string, userId?: string) {
    try {
        const product = await prisma.product.findUnique({
            where: { id },
            include: {
                seller: { include: { profile: true } },
                _count: { select: { likes: true } },
                likes: userId ? { where: { userId } } : false
            }
        });

        if (!product) return null;

        return {
            ...product,
            price: Number(product.price),
            likesCount: product._count.likes,
            isLiked: userId ? product.likes.length > 0 : false
        };
    } catch (error) {
        console.error("Failed to fetch product:", error);
        return null;
    }
}

export async function createProduct(sellerId: string, data: ProductData) {
    try {
        const product = await prisma.product.create({
            data: {
                ...data,
                sellerId,
                // Ensure price is decimal string or number
            }
        });
        return { success: true, product };
    } catch (error) {
        console.error("Failed to create product:", error);
        return { success: false, error: "Failed to create product" };
    }
}

export async function deleteProduct(id: string, sellerId: string) {
    try {
        // Verify ownership
        const product = await prisma.product.findUnique({ where: { id } });
        if (!product || product.sellerId !== sellerId) {
            return { success: false, error: "Unauthorized" };
        }

        await prisma.product.delete({ where: { id } });
        return { success: true };
    } catch (error) {
        console.error("Failed to delete product:", error);
        return { success: false, error: "Failed to delete product" };
    }
}

export async function updateProduct(id: string, sellerId: string, data: Partial<ProductData>) {
    try {
        // Verify ownership
        const product = await prisma.product.findUnique({ where: { id } });
        if (!product || product.sellerId !== sellerId) {
            return { success: false, error: "Unauthorized" };
        }

        const updated = await prisma.product.update({
            where: { id },
            data
        });
        return { success: true, product: updated };
    } catch (error) {
        console.error("Failed to update product:", error);
        return { success: false, error: "Failed to update product" };
    }
}
