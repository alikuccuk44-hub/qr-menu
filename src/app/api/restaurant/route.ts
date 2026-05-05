import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { revalidateTag } from 'next/cache';

export async function PUT(request: Request) {
  try {
    const { id, name, logoUrl, adminPassword, primaryColor, backgroundColor, surfaceColor } = await request.json();
    if (!id) return NextResponse.json({ error: 'Eksik veri' }, { status: 400 });

    const restaurant = await prisma.restaurant.update({
      where: { id },
      data: { 
        name: name || undefined,
        logoUrl: logoUrl || undefined,
        adminPassword: adminPassword || undefined,
        primaryColor: primaryColor || undefined,
        backgroundColor: backgroundColor || undefined,
        surfaceColor: surfaceColor || undefined
      }
    });

    revalidateTag('restaurant');

    return NextResponse.json(restaurant);
  } catch (error) {
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const restaurant = await prisma.restaurant.findFirst();
    return NextResponse.json(restaurant);
  } catch (error) {
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 });
  }
}
