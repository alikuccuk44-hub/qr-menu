import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    
    const restaurant = await prisma.restaurant.findFirst();
    const correctPassword = restaurant?.adminPassword || process.env.ADMIN_PASSWORD || 'admin';

    if (password === correctPassword) {
      const response = NextResponse.json({ success: true });
      response.cookies.set('admin_token', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
      });
      return response;
    }

    return NextResponse.json(
      { error: 'Hatalı şifre' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Sunucu hatası' },
      { status: 500 }
    );
  }
}
