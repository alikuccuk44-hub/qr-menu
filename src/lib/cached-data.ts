import { prisma } from './prisma';
import { unstable_cache } from 'next/cache';

export const getRestaurant = unstable_cache(
  async () => {
    return prisma.restaurant.findFirst();
  },
  ['restaurant'],
  { tags: ['restaurant'], revalidate: 3600 }
);

export const getRestaurantByQrId = unstable_cache(
  async (qrCodeId: string) => {
    return prisma.restaurant.findUnique({
      where: { qrCodeId },
      include: {
        categories: {
          include: {
            products: {
              orderBy: { createdAt: 'desc' }
            }
          },
          orderBy: { createdAt: 'asc' }
        }
      }
    });
  },
  ['restaurant-qr'],
  { tags: ['restaurant'], revalidate: 3600 }
);

export const getCategories = unstable_cache(
  async (restaurantId: string) => {
    return prisma.category.findMany({
      where: { restaurantId },
      include: { _count: { select: { products: true } } },
      orderBy: { createdAt: 'asc' }
    });
  },
  ['categories'],
  { tags: ['categories'], revalidate: 3600 }
);

export const getProducts = unstable_cache(
  async (restaurantId: string) => {
    return prisma.product.findMany({
      where: { category: { restaurantId } },
      include: { category: true },
      orderBy: { createdAt: 'desc' }
    });
  },
  ['products'],
  { tags: ['products'], revalidate: 3600 }
);
