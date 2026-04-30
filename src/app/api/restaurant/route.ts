import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(request: Request) {
  try {
    const { id, name, logoUrl, adminPassword, primaryColor, backgroundColor } = await request.json();
    if (!id) return NextResponse.json({ error: 'Eksik veri' }, { status: 400 });

    const restaurant = await prisma.restaurant.update({
      where: { id },
      data: { 
        name: name || undefined,
        logoUrl: logoUrl || undefined,
        adminPassword: adminPassword || undefined,
        primaryColor: primaryColor || undefined,
        backgroundColor: backgroundColor || undefined
      }
    });

    return NextResponse.json(restaurant);
  } catch (error) {
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 });
  }
}
