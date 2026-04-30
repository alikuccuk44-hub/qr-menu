import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { translateText } from '@/lib/translate';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const priceStr = formData.get('price') as string;
    const categoryName = formData.get('categoryName') as string;
    const imageUrl = formData.get('imageUrl') as string;

    if (!name || !priceStr || !categoryName) {
      return NextResponse.json({ error: 'Eksik alanlar' }, { status: 400 });
    }

    const price = parseFloat(priceStr);

    // Get or Create Category
    let category = await prisma.category.findFirst({
      where: { name: categoryName }
    });

    if (!category) {
      const restaurant = await prisma.restaurant.findFirst();
      if (!restaurant) throw new Error('Restaurant not found');
      
      // Translate category name too
      const [catEn, catRu, catDe] = await Promise.all([
        translateText(categoryName, 'en'),
        translateText(categoryName, 'ru'),
        translateText(categoryName, 'de')
      ]);

      category = await prisma.category.create({
        data: {
          name: categoryName,
          nameEn: catEn,
          nameRu: catRu,
          nameDe: catDe,
          restaurantId: restaurant.id
        }
      });
    }

    // Auto-Translate Product
    const [nameEn, nameRu, nameDe] = await Promise.all([
      translateText(name, 'en'),
      translateText(name, 'ru'),
      translateText(name, 'de')
    ]);

    const [descriptionEn, descriptionRu, descriptionDe] = await Promise.all([
      description ? translateText(description, 'en') : Promise.resolve(null),
      description ? translateText(description, 'ru') : Promise.resolve(null),
      description ? translateText(description, 'de') : Promise.resolve(null)
    ]);

    const product = await prisma.product.create({
      data: {
        name, nameEn, nameRu, nameDe,
        description: description || null, descriptionEn, descriptionRu, descriptionDe,
        price, 
        categoryId: category.id,
        imageUrl: imageUrl || null
      }
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error('Product creation error:', error);
    return NextResponse.json({ error: 'Ürün oluşturulamadı' }, { status: 500 });
  }
}
