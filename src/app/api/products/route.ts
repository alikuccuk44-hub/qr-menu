import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { translateText } from '@/lib/translate';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const priceStr = formData.get('price') as string;
    const categoryId = formData.get('categoryId') as string;
    const imageUrl = formData.get('imageUrl') as string;

    if (!name || !priceStr || !categoryId) {
      return NextResponse.json({ error: 'Eksik alanlar' }, { status: 400 });
    }

    const price = parseFloat(priceStr);

    // Auto-Translate
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
        price, categoryId,
        imageUrl: imageUrl || null
      }
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error('Product creation error:', error);
    return NextResponse.json({ error: 'Ürün oluşturulamadı' }, { status: 500 });
  }
}
